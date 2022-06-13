import express from 'express';
import path from 'path';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
const __dirname = path.resolve();
const port = process.env.PORT || 5000;

dotenv.config();
const app = express();

// to connect to backend mongodb database
async function runbackendConfig(app) {
  try {
    // first, use mongodb string to connect to db
    const result = await mongoose.connect(process.env.MONGODB_CONNECTION_STRING);
    console.log(`backend mongoDB altas is connected at ${result.connection.host}`);

    // only with no error from above operation, we then initalize the express app for listening
    app.listen(port, function () {
      console.log('web is connected to server listening');
    });
  } catch (error) {
    console.log(error.message);
  }
}
// ---------------------------------------------------------------------------------

// setup database collection and document config

const patientSchema = new mongoose.Schema(
  {
    email: {
      type: String,
      trim: true,
      lowercase: true,
    },
    occupation: {
      type: String,
      trim: true,
      lowercase: true,
    },
    gender: {
      type: String,
      trim: true,
      lowercase: true,
    },
    age: {
      type: Number,
    },
    underMedicalCondition: {
      type: String,
      trim: true,
    },
    willingToGiveConsent: {
      type: String,
      trim: true,
    },
    appSelect: {
      type: [String],
    },
  },
  { timestamps: true }
);

const doctorSchema = new mongoose.Schema(
  {
    email: {
      type: String,
      trim: true,
      lowercase: true,
    },
    importanceRange: {
      type: String,
      trim: true,
      lowercase: true,
    },
    consentSelect: {
      type: String,
      trim: true,
      lowercase: true,
    },
    healthCareSystem: {
      type: String,
      trim: true,
      lowercase: true,
    },
    dataCategory: {
      type: [String],
    },
  },
  { timestamps: true }
);

const doctorModel = mongoose.model('doctors', doctorSchema);
const patientModel = mongoose.model('patients', patientSchema);

// ---------------------------------------------------------------------------------

runbackendConfig(app);
app.use(express.static(__dirname + '/public'));
app.use(express.urlencoded({ extended: false }));

// ---------------------------------------------------------------------------------

app.get('/', (req, res) => {
  res.sendFile(__dirname + '/views/index.html');
});

app.get('/patient', (req, res) => {
  res.sendFile(__dirname + '/views/patient.html');
});

app.get('/doctor', (req, res) => {
  res.sendFile(__dirname + '/views/doctor.html');
});

app.post('/patient-thank-you', async (req, res) => {
  const formInput = req.body;
  console.log(formInput);
  await patientModel.create({
    email: formInput.email,
    occupation: formInput.occupationSelect,
    gender: formInput.genderSelect,
    age: formInput.age,
    underMedicalCondition: formInput.medicalConditionSelect,
    willingToGiveConsent: formInput.consentSelect,
    appSelect: ['Generis', 'Teladoc'],
  });

  res.sendFile(__dirname + '/views/thankYou.html');
});

app.post('/doctor-thank-you', async (req, res) => {
  const formInput = req.body;
  console.log(formInput);
  await doctorModel.create({
    email: formInput.email,
    importanceRange: formInput.importanceRange,
    consentSelect: formInput.consentSelect,
    healthCareSystem: formInput.healthCareSystem,
    dataCategory: ['category A', 'category B'],
  });

  res.sendFile(__dirname + '/views/thankYou.html');
});
