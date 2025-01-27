## Objective: ##
Create a Application for patient information input fields, chest X-ray image upload, visual display of the X-ray with highlighted potential TB areas, a confidence score indicating the likelihood of TB, detailed analysis reports, and 3D revolving view for TB-DETECTION

For choose image section on Home page choose any image provide in testing data folder.

## File Structure ##


- **project/**: Main project directory.
  - **.git/**: Git directory for version control.
  - **backend/**: Main backend directory(node.js)
  - **frontend/**: Frontend directory(react.js)
  - **node_modules/**: Contains dependencies installed via npm.
  - **.gitignore**: Specifies files to be ignored by Git.
  - **package.json**: Lists project dependencies and scripts.
  - **package-lock.json**: Contains exact versions of installed dependencies.

## Features: ##
User Submission Form:
Collects patient name, age, gender, contact details, social media handle, and chest X-ray image uploads.

Data Storage:
All data, including patient info, X-ray metadata, and analysis results, is stored in MongoDB.

TB Detection:
AI-powered analysis highlights potential TB areas in X-rays with confidence scores and detailed analysis reports.

3D Visualization:
Provides an interactive 3D revolving view of X-rays for better insights using Three.js.

## Technology used: #
Frontend: React, Axios, 3JS
Backend: Node.js, Express, MongoDB, Mongoose
Styling: tailwindcss



## Workflow

### Backend Setup

1. **Initialize Backend:**
   - Navigate to the `tb-backend` folder:
     ```bash
     cd tb-backend
     ```
   - Initialize Node.js project:
     ```bash
     npm init -y
     ```

2. **Install Dependencies:**
   ```bash
   npm install express mongoose cors body-parser dotenv
   ```

3. **Setup Environment Variables:**
   Create a .env file in backend:
   ```bash 
      MONGO_URI = Your mongoDB_URI
   ```
4. **Create server.js:**
   Setup Express server, connect to MongoDB, and define routes.
   Define Models and Routes.
   
6. **Start Backend Server:**
```bash 
   nodemon index.js
```
### Frontend Setup
1. **Initialize Frontend:**

Navigate to the frontend folder:
  ```bash
cd ../frontend
```
2. **Create React app using Vite or set up manually:**
```bash

npx create-react-app
```
3. **Install Dependencies:**

```bash

npm install axios
```
4. **Create Components:**

create components provided here.

5.**Start Frontend Development Server:**

```bash

npm run dev
```

### User Submission:

Access the user form, fill in details, and generate result.
Data is stored in MongoDB.
for choose image section choose any image provide in testing data folder.




## Outputs

1. ### User form:
  Allow users (patients) to submit their details and X-ray images for TB analysis.

   <img width="958" alt="image" src="https://drive.google.com/file/d/1POFxAwjSoaXE_ovvCHXE_jXupTbQWXg7/view?usp=sharing" />

2. ### Dignosis Result
  Diagnosis result will display here 

<img width="958" alt="image" src="https://drive.google.com/file/d/1eqU8DB_ZMmhyQrkSb4vLdIap-emrFXub/view?usp=sharing" />

3. ### 3D View
   Visualise Result In 3D view
   
<img width="941" alt="image" src="https://drive.google.com/file/d/1AGkVS4TH7c_y9Vd0Gmk7WYgHN81757Qs/view?usp=sharing" />


