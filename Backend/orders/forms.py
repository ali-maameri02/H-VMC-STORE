from django import forms

class GoogleSheetExportForm(forms.Form):
    email = forms.EmailField(label="Google Email to Share With")
    date = forms.DateField(label="Order Date", widget=forms.SelectDateWidget)
