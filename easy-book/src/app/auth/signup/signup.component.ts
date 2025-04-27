import { CommonModule } from "@angular/common";
import { HttpClient, HttpClientModule } from "@angular/common/http";
import { Component, Optional } from "@angular/core";
import {
  FormBuilder,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from "@angular/forms";
import { MatButtonModule } from "@angular/material/button";
import { MatCardModule } from "@angular/material/card";
import { MatDialogRef } from "@angular/material/dialog";
import { MatFormFieldModule } from "@angular/material/form-field";
import { MatIconModule } from "@angular/material/icon";
import { MatInputModule } from "@angular/material/input";
import { MatListModule } from "@angular/material/list";
import { MatSidenavModule } from "@angular/material/sidenav";
import { MatToolbarModule } from "@angular/material/toolbar";
import { Router } from "@angular/router";
import { SharedModule } from "../../shared/shared.module";

@Component({
  selector: "app-signup",
  templateUrl: "./signup.component.html",
  styleUrls: ["./signup.component.scss"],
  imports: [
    CommonModule,
    MatSidenavModule,
    MatToolbarModule,
    MatListModule,
    MatButtonModule,
    MatIconModule,
    MatInputModule,
    MatFormFieldModule,
    MatCardModule,
    FormsModule,
    SharedModule,
    ReactiveFormsModule,
    HttpClientModule,
  ],
})
export class SignupComponent {
  signupForm: FormGroup;
  roles: string[] = ["User", "Admin"];

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private httpClit: HttpClient,
    @Optional() private dialogRef: MatDialogRef<SignupComponent>
  ) {
    this.signupForm = this.fb.group({
      username: ["", Validators.required],
      password: ["", Validators.required],
      email: ["", [Validators.required, Validators.email]],
      phoneNumber: ["", Validators.required],
      address: ["", Validators.required],
      role: ["", Validators.required],
    });
  }

  onSubmit() {
    if (!this.signupForm.value.email) {
      return alert("Password and email are not allowed to be empty");
    }
    console.log("Signup data:", this.signupForm.value);

    // Perform your signup logic here
    let body = {
      name: this.signupForm.value.username,
      email: this.signupForm.value.email,
      phone: this.signupForm.value.phoneNumber,
    };
    this.httpClit.post("http://127.0.0.1:8000/users", body).subscribe(
      (response) => {
        console.log("Signup successful:", response);
        if (this.router.url === "/signup") {
          alert("Signup successful");
          this.router.navigate(["/login"]);
        }
        if (this.dialogRef) {
          alert("Registration successful");

          this.dialogRef.close("success");
        }
      },
      (error) => {
        alert(error.detail || "Error during signup");
      }
    );
    // Close the dialog if it was opened as a dialog

    // Here you can call your API to save the user
  }
}
