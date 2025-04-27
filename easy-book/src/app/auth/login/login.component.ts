import { CommonModule } from "@angular/common";
import { HttpClient, HttpClientModule } from "@angular/common/http";
import { Component } from "@angular/core";
import {
  FormBuilder,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from "@angular/forms";
import { MatButtonModule } from "@angular/material/button";
import { MatCardModule } from "@angular/material/card";
import { MatFormFieldModule } from "@angular/material/form-field";
import { MatIconModule } from "@angular/material/icon";
import { MatInputModule } from "@angular/material/input";
import { MatListModule } from "@angular/material/list";
import { MatSidenavModule } from "@angular/material/sidenav";
import { MatToolbarModule } from "@angular/material/toolbar";
import { Router } from "@angular/router";
import { SharedModule } from "../../shared/shared.module";
@Component({
  selector: "app-login",
  templateUrl: "./login.component.html",
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
  styleUrl: "./login.component.scss",
})
export class LoginComponent {
  users: any[] = [];
  loginForm: FormGroup;
  email = "";
  password = "";
  constructor(
    private fb: FormBuilder,
    private router: Router,
    private httpClient: HttpClient
  ) {
    this.loginForm = this.fb.group({
      email: ["", [Validators.required, Validators.email]],
      password: ["", Validators.required],
    });
  }

  ngOnInit() {
    console.log("Login component initialized");
    let userAPi = this.httpClient.get("http://127.0.0.1:8000/users");
    userAPi.subscribe((data: any) => {
      this.users = data;
      console.log("Users data:", this.users);
    });
  }

  onLogin() {
    if (this.loginForm.valid) {
      const { email, password } = this.loginForm.value;
      let isValidUser = false;
      let currentUser = null;
      this.users.forEach((user) => {
        if (user.email === email && user.email.split("@")[0] === password) {
          isValidUser = true;
          currentUser = user;
        }
      });

      if (isValidUser && currentUser) {
        localStorage.setItem("user", JSON.stringify(currentUser));
        localStorage.setItem(
          "role",
          typeof currentUser["email"] === "string" &&
            (currentUser["email"] as string).split("@")[0] === "admin"
            ? "admin"
            : "customer"
        );
        this.router.navigate(["/home"]);
        return;
      } else {
        alert("Invalid email or password");
      }
    }
  }

  login() {
    // Assume role stored in localStorage after dummy auth
    localStorage.setItem(
      "role",
      this.email === "admin@hotel.com" ? "admin" : "customer"
    );
    this.router.navigate(["/dashboard"]);
  }
}
