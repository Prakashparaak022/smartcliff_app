const express = require('express');
const cors = require('cors');
const session = require('express-session');
const path  = require('path')
const app = express();

//Middleware
app.use((req,res,next)=>{
  console.log('path is'+req.path+'Method is'+req.method);
  next();
})
app.use(cors());
app.use(express.json())

// 
app.use('/public', express.static(path.join(__dirname, 'public')));


const courseRoute = require('./routes/CourseRoute');
const enquiryRoute = require('./routes/EnquiryRoute');
const serviceRoute = require('./routes/ServiceRoute');
const studentRoute = require('./routes/StudentRoute');
const CorporateRoute = require('./routes/CorporateRoute');
const InstituteRoute = require('./routes/InstituteRoute');
const ContactRoute = require('./routes/ContactRoutes');
const ApplicationRoute = require('./routes/ApplicationRoute');
const HireRoute = require('./routes/HireRoute');
const UserRoute = require('./routes/UserRoute');
const CategoryRoute = require('./routes/CategoryRoute')
const ServiceListRoute = require('./routes/ServiceListRoute')


app.use('/courses', courseRoute);
app.use('/enquiry', enquiryRoute);
app.use('/services', serviceRoute);
app.use('/students', studentRoute);
app.use('/corporate', CorporateRoute);
app.use('/institute', InstituteRoute);
app.use('/contacts', ContactRoute);
app.use('/applications', ApplicationRoute);
app.use('/Hire', HireRoute);
app.use('/users', UserRoute);
app.use('/categories',CategoryRoute)
app.use('/servicelists',ServiceListRoute)

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server is running on port http://localhost:${PORT}`);
});
