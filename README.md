# MERN Stack Portfolio Website

A modern, responsive portfolio website built with the MERN stack (MongoDB, Express, React, Node.js) featuring premium design aesthetics, dark/light mode, smooth animations, and comprehensive portfolio management.

## ✨ Features

- **Premium Design**: Vibrant gradients, glassmorphism effects, and smooth animations
- **Dark/Light Mode**: Toggle between themes with localStorage persistence
- **Responsive Design**: Fully responsive across all devices
- **Dynamic Content**: Projects, skills, and experience loaded from MongoDB
- **Contact Form**: Functional contact form with backend integration
- **Project Filtering**: Filter projects by category
- **Smooth Animations**: Micro-interactions and scroll animations
- **SEO Optimized**: Proper meta tags and semantic HTML

## 🚀 Technology Stack

### Frontend
- React 18
- Vite
- Axios
- CSS3 with custom properties
- Google Fonts (Inter)

### Backend
- Node.js
- Express.js
- MongoDB with Mongoose
- CORS
- dotenv

## 📦 Installation

### Prerequisites
- Node.js (v16 or higher)
- MongoDB (local or MongoDB Atlas)

### Backend Setup

1. Navigate to the backend directory:
```bash
cd backend
```

2. Install dependencies:
```bash
npm install
```

3. Configure environment variables:
Create a `.env` file in the backend directory with:
```env
MONGODB_URI=mongodb://localhost:27017/portfolio
PORT=5000
NODE_ENV=development
```

For MongoDB Atlas, use:
```env
MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/portfolio?retryWrites=true&w=majority
```

4. Seed the database with sample data:
```bash
npm run seed
```

5. Start the backend server:
```bash
npm run dev
```

The backend will run on `http://localhost:5000`

### Frontend Setup

1. Navigate to the frontend directory:
```bash
cd frontend
```

2. Install dependencies:
```bash
npm install
```

3. Start the development server:
```bash
npm run dev
```

The frontend will run on `http://localhost:5173`

## 🎨 Customization

### Update Personal Information

1. **Hero Section**: Edit `frontend/src/components/Hero.jsx`
   - Update name, roles, and description
   - Update social media links

2. **About Section**: Edit `frontend/src/components/About.jsx`
   - Update bio and statistics

3. **Contact Information**: Edit `frontend/src/components/Contact.jsx`
   - Update email, phone, and location

4. **Footer**: Edit `frontend/src/components/Footer.jsx`
   - Update copyright name

### Add Your Own Data

1. **Projects**: Add projects via MongoDB or update `backend/seed.js`
2. **Skills**: Add skills via MongoDB or update `backend/seed.js`
3. **Experience**: Add experience via MongoDB or update `backend/seed.js`

### Customize Colors

Edit CSS variables in `frontend/src/index.css`:
```css
:root {
  --primary-hue: 260;    /* Purple */
  --secondary-hue: 320;  /* Pink */
  --accent-hue: 180;     /* Cyan */
}
```

## 📁 Project Structure

```
portfolioWebsite/
├── backend/
│   ├── models/
│   │   ├── Project.js
│   │   ├── Skill.js
│   │   ├── Experience.js
│   │   └── Contact.js
│   ├── routes/
│   │   └── portfolio.js
│   ├── server.js
│   ├── seed.js
│   ├── package.json
│   └── .env
├── frontend/
│   ├── src/
│   │   ├── components/
│   │   │   ├── Navbar.jsx/css
│   │   │   ├── Hero.jsx/css
│   │   │   ├── About.jsx/css
│   │   │   ├── Skills.jsx/css
│   │   │   ├── Projects.jsx/css
│   │   │   ├── Experience.jsx/css
│   │   │   ├── Contact.jsx/css
│   │   │   └── Footer.jsx/css
│   │   ├── context/
│   │   │   └── ThemeContext.jsx
│   │   ├── App.jsx
│   │   ├── main.jsx
│   │   └── index.css
│   ├── index.html
│   ├── vite.config.js
│   └── package.json
└── README.md
```

## 🔧 API Endpoints

- `GET /api/projects` - Get all projects
- `GET /api/projects/:id` - Get single project
- `GET /api/skills` - Get all skills
- `GET /api/experience` - Get all experience
- `POST /api/contact` - Submit contact form
- `GET /api/contacts` - Get all contact messages

## 🌐 Deployment

### Backend Deployment (Render, Heroku, etc.)
1. Set environment variables in your hosting platform
2. Deploy the backend directory
3. Update MongoDB URI to production database

### Frontend Deployment (Vercel, Netlify, etc.)
1. Build the frontend:
```bash
cd frontend
npm run build
```
2. Deploy the `dist` folder
3. Update API proxy in `vite.config.js` to point to production backend URL

## 📝 License

MIT License - feel free to use this project for your own portfolio!

## 🤝 Contributing

Contributions, issues, and feature requests are welcome!

## 👨‍💻 Author

**Your Name**
- GitHub: [@yourusername](https://github.com/yourusername)
- LinkedIn: [Your Name](https://linkedin.com/in/yourprofile)

## 🙏 Acknowledgments

- Design inspiration from modern portfolio websites
- Icons from various SVG sources
- Images from Unsplash (for demo purposes)
