import { Component, OnInit, Input, Inject } from '@angular/core';
import { MAT_SNACK_BAR_DATA } from '@angular/material';

export interface ISnackBarStatus{
  message: string;
}

export class SnackbarStatusBase{

    message: string;
    constructor( @Inject(MAT_SNACK_BAR_DATA)  data: ISnackBarStatus){
      this.message = data.message;
    }

}
