import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { selectValidator } from '../../validators/select-validator';
import { Subject } from 'rxjs/Subject';
import { debounceTime } from 'rxjs/operators';

@Component({
  selector: 'app-client',
  templateUrl: './client.component.html',
  styleUrls: ['./client.component.scss']
})
export class ClientComponent implements OnInit {

  form: FormGroup;
  fileForm: FormGroup;

  codes: string[] = ["+254", "+255", "+256", "+257"];

  _success = new Subject<string>();
  successMessage: string;

  constructor(private _fb: FormBuilder) { 
    this.form = _fb.group({
      'names': [null],
      'code': [null,Validators.compose([Validators.required, Validators.pattern('[0-9]{3,3}')])],
      'phone': [null,Validators.compose([Validators.required, Validators.pattern('^7[0-9]{8,8}')])]
    });
    this.fileForm = _fb.group({
      'file': [null,Validators.required]
    });
  }

  ngOnInit() {
    this._success.subscribe((message) => this.successMessage = message);
    this._success.pipe(
      debounceTime(5000)
    ).subscribe(() => this.successMessage = null);
  }

  createClient(form){   
    this._success.next("Successfully created Client "+form.names+" Phone No: "+form.phone);
    this.form.reset();
  }

  createClients(form){
    this._success.next("Successfully created Clients");
    this.fileForm.reset();
  }
}
