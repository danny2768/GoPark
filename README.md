# GoPark

GoPark is your go-to solution for hassle-free parking payments. Say goodbye to fumbling for coins or dealing with outdated payment machines. With GoPark, you can conveniently pay for your parking time using your smartphone, making the entire process seamless and stress-free.

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 17.0.10.

## Prerequisites

Before you begin, ensure you have met the following requirements:

* You have installed the latest version of [Node.js and npm](https://nodejs.org/en/download/)
* You have a `<Windows/Linux/Mac>` machine. State if OS matters.

## Setting Up

Clone the repository to your local machine:

```bash
git clone <repository_url>
```

Navigate to the project directory:

```bash
cd GoPark
```

Install the dependencies:

```bash
npm install
```

## Configuration
Before running the application, you need to set the environment variables in the /environments directory.

Create a environment.ts file in the /environments directory and add your configuration:

```
export const environments = {
  baseUrl: 'http://localhost:8080',
  vehicleTypes: {
    <id>: 'Car',
    <id>: 'Motorcycle',
  },
  roleTypes: {
    <id>: 'Admin',
    <id>: 'Super Admin',
  }
}
```

## Running the Application

Run the following command to start a development server:

```
ng serve
```

Then navigate to http://localhost:4200/. The application will automatically reload if you change any of the source files.

## Building the Project

To build the project, run:

```
ng build
```
