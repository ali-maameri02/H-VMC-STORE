# pylint: disable=import-error
# pylint: disable=import-error,no-member
import datetime
from django.conf import settings
from google.oauth2 import service_account
from googleapiclient.discovery import build
from orders.models import Order


def export_orders_to_sheet(target_email: str, order_date: datetime.date) -> str:
    # Setup credentials
    SCOPES = [
        'https://www.googleapis.com/auth/spreadsheets',
        'https://www.googleapis.com/auth/drive'
    ]
    credentials = service_account.Credentials.from_service_account_file(
        settings.GOOGLE_SERVICE_ACCOUNT_FILE,
        scopes=SCOPES
    )

    sheets_service = build('sheets', 'v4', credentials=credentials)
    drive_service = build('drive', 'v3', credentials=credentials)

    # Filter orders by date (midnight to 23:59)
    start = datetime.datetime.combine(order_date, datetime.time.min)
    end = datetime.datetime.combine(order_date, datetime.time.max)

    orders = (
        Order.objects
        .filter(created_at__range=(start, end))
        .select_related('client')
        .prefetch_related('items__product')
    )

    # Prepare data
    sheet_data = [["Order ID", "Client Email", "Created At", "Is Sent", "Product", "Quantity"]]

    for order in orders:
        for item in order.items.all():
            sheet_data.append([
                order.id,
                order.client.email,
                order.created_at.strftime("%Y-%m-%d %H:%M"),
                "Yes" if order.is_sent else "No",
                item.product.name,
                item.quantity
            ])

    # Create spreadsheet
    spreadsheet_body = {
        'properties': {
            'title': f'Orders_{order_date.strftime("%Y_%m_%d")}'
        }
    }

    spreadsheet = sheets_service.spreadsheets().create(
        body=spreadsheet_body,
        fields='spreadsheetId'
    ).execute()

    spreadsheet_id = spreadsheet.get('spreadsheetId')

    # Write to the sheet
    sheets_service.spreadsheets().values().update(
        spreadsheetId=spreadsheet_id,
        range='A1',
        valueInputOption='RAW',
        body={'values': sheet_data}
    ).execute()

    # Share the sheet with the target email
    drive_service.permissions().create(
        fileId=spreadsheet_id,
        body={
            'type': 'user',
            'role': 'writer',
            'emailAddress': target_email
        },
        fields='id',
    ).execute()

    return spreadsheet_id  # You can return the ID or a full link
