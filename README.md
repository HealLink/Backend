# HealLink Back-End Setup

## How to Install

### Clone the Repository
Clone this repository and navigate to the cloned directory:
```bash
# Clone the repository
git clone https://github.com/HealLink/Backend.git

# Navigate to the HealLink folder
cd HealLink
```

### Install Dependencies
Run the following command to install all necessary dependencies:
```bash
npm install
```

### Setup Environment Variables
Create a `.env` file inside the `HealLink` folder with the following structure:
```env
PROJECT_ID = "your project id in GCP"
STORAGE_ACCESS_KEY = "your JSON storage access key"
```
Replace `your project id in GCP` and `your JSON storage access key` with your actual Google Cloud Platform project ID and the JSON access key for your storage bucket.

### Run the Server
You can run the server in two ways:

#### Run with Node.js
```bash
npm run start
```

#### Run with Nodemon (for development)
```bash
npm run start-dev
```

---

## Contributing
We welcome contributions to improve the HealLink back-end. To contribute:

1. Fork the repository.
2. Create a new branch for your feature or bug fix.
3. Make your changes and commit them.
4. Submit a pull request.

---




