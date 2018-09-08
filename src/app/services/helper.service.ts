import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material';

@Injectable({
  providedIn: 'root'
})
export class HelperService
{

  constructor(
    private snackBar: MatSnackBar
  )
  { }

  showAlert(message = '', action = 'OKAY', config = { duration: 4000 })
  {
    if (message === '')
    {
      message = 'Hello, we seem to be experiencing server issues. Please try again later.';
      config = { duration: 10000 };
      action = '';
    }
    if (message && message.trim())
    {
      this.snackBar.open(message, action, config);
    }
  }
}
