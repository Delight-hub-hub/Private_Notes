# Private Notes App

A modern, full-stack web application for creating and managing private notes with user authentication and real-time database integration.

## 🌟 Features

- **User Authentication**: Secure registration and login with Supabase Auth
- **Private Notes CRUD**: Create, read, update, and delete your personal notes
- **Search Functionality**: Search through your notes by title or content
- **Responsive Design**: Beautiful, mobile-friendly UI with Tailwind CSS
- **Real-time Database**: All notes are stored securely in Supabase
- **Session Management**: Automatic session handling and logout functionality

## 🛠️ Tech Stack

- **Frontend Framework**: React 19.2
- **Routing**: React Router DOM 7.12
- **Styling**: Tailwind CSS 4.1 + Custom CSS
- **Backend/Database**: Supabase
- **Build Tool**: Vite 7.2
- **Package Manager**: npm

## 📋 Prerequisites

Before you begin, ensure you have the following installed:
- Node.js (v16 or higher)
- npm (v7 or higher)

## 🚀 Installation & Setup

### 1. Clone the Repository
```bash
git clone https://github.com/Delight-hub-hub/Private_Notes.git
cd detter
```

### 2. Install Dependencies
```bash
npm install
```

### 3. Set Up Supabase

1. Go to [supabase.com](https://supabase.com) and create a free account
2. Create a new project
3. In your project settings, copy:
   - **Project URL**
   - **Anon Key** (from API settings)

### 4. Configure Environment Variables

Create a `.env.local` file in the project root:
```env
VITE_SUPABASE_URL=https://your-project-url.supabase.co
VITE_SUPABASE_ANON_KEY=your-anon-key-here
```

### 5. Create Supabase Tables

In your Supabase project, create a `notes` table with these columns:
- `id` (UUID, Primary Key)
- `title` (text)
- `content` (text)
- `created_at` (timestamp, default: now())
- `user_id` (UUID, optional - for future enhancements)

### 6. Run Development Server
```bash
npm run dev
```

Visit `http://localhost:5173/` in your browser.

## 📦 Project Structure

```
detter/
├── src/
│   ├── components/
│   │   ├── Login.jsx
│   │   ├── Login.css
│   │   ├── Register.jsx
│   │   ├── Register.css
│   │   ├── Dashboard.jsx
│   │   ├── Dashboard.css
│   │   └── supabaseClient.js
│   ├── App.jsx
│   ├── App.css
│   ├── main.jsx
│   └── index.css
├── index.html
├── vite.config.js
├── tailwind.config.js
├── package.json
└── README.md
```

## 🎯 Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build
- `npm run lint` - Run ESLint

## 📱 Pages

### 1. Register Page
- First page users see
- Create new account with first name, last name, email, and password
- Password validation (minimum 6 characters)
- Link to login page

### 2. Login Page
- Sign in with existing credentials
- Redirects to dashboard on successful login
- Link to registration page

### 3. Dashboard
- Main application interface
- Create new notes with title and content
- Edit existing notes
- Delete notes with confirmation
- Search notes by title or content
- View all notes in a grid layout
- Logout button

## 🔒 Security

- User authentication via Supabase Auth
- Environment variables for sensitive data
- Session management with automatic logout
- Notes are tied to user sessions

## 🌐 Deployment

### Deploying to Vercel

1. Push your code to GitHub
2. Go to [vercel.com](https://vercel.com) and sign in with GitHub
3. Click "New Project" and select your repository
4. Add environment variables:
   - `VITE_SUPABASE_URL`
   - `VITE_SUPABASE_ANON_KEY`
5. Click "Deploy"

## 🎨 Styling

The app combines two styling approaches:
- **Tailwind CSS**: Utility-first CSS framework for responsive design
- **Custom CSS**: Custom styling files for each component

## 🐛 Troubleshooting

### Styles not showing on Vercel
- Make sure environment variables are added to Vercel project settings
- Redeploy without using cache
- Clear browser cache

### Can't connect to Supabase
- Verify environment variables are correct
- Check Supabase project is active
- Ensure API key has correct permissions

### Notes not saving
- Check browser console for errors
- Verify Supabase table exists with correct schema
- Check database connection

## 📝 Features Coming Soon

- Note categories/tags
- Note sharing with other users
- Rich text editor
- Note export (PDF, TXT)
- Dark mode toggle
- Note archiving

## 👤 Author

Created with ❤️ by [Delight-hub-hub](https://github.com/Delight-hub-hub)

## 📄 License

This project is open source and available under the MIT License.

## 🤝 Contributing

Contributions are welcome! Feel free to:
1. Fork the repository
2. Create a feature branch
3. Commit your changes
4. Push to the branch
5. Open a Pull Request

## 📞 Support

For support, please open an issue on the [GitHub repository](https://github.com/Delight-hub-hub/Private_Notes/issues).

## 🔗 Useful Links

- [React Documentation](https://react.dev)
- [Supabase Documentation](https://supabase.com/docs)
- [Tailwind CSS Documentation](https://tailwindcss.com/docs)
- [Vite Documentation](https://vite.dev)
- [React Router Documentation](https://reactrouter.com)

---

**Happy Note-Taking! 📝**
