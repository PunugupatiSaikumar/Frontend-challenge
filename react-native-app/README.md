# 🎾 Tennis Court Review App

A modern React Native mobile application for discovering and reviewing tennis courts.

## 📱 Features

- **Court Discovery**: Browse 50+ tennis courts with detailed information
- **Smart Search**: Find courts by name, location, or surface type
- **Interactive Reviews**: Rate courts with stars and recommend to friends
- **Rich Details**: View amenities, pricing, and court specifications
- **Modern UI**: Clean, mobile-first design with smooth animations

## 🚀 Quick Start

### Prerequisites
- Node.js (v14 or higher)
- npm or yarn
- Expo Go app on your mobile device

### Installation

1. **Install dependencies:**
   ```bash
   npm install
   ```

2. **Start the development server:**
   ```bash
   npm start
   ```

3. **Run on device:**
   - Install Expo Go from App Store/Google Play
   - Scan the QR code displayed in your terminal
   - The app will load on your device

### Alternative: Run on Simulator

```bash
# iOS Simulator
npm run ios

# Android Emulator
npm run android
```

## 📁 Project Structure

```
react-native-app/
├── App.js                    # Main application component
├── screens/                  # Screen components
│   ├── CourtListScreen.js    # Court listing and search
│   └── CourtDetailScreen.js  # Court details and reviews
├── data/                     # Mock data
│   └── mockCourts.js         # Tennis court data
├── assets/                   # Images and icons
└── package.json             # Dependencies
```

## 🎯 Key Components

### CourtListScreen
- Displays list of tennis courts
- Search functionality with modal overlay
- Sort by rating, price, or distance
- Modern card-based layout

### CourtDetailScreen
- Detailed court information
- Interactive star rating system
- Review submission with recommendations
- Amenities and pricing display

## 🛠️ Technology Stack

- **React Native** - Mobile app framework
- **Expo** - Development platform
- **React Navigation** - Screen navigation
- **JavaScript ES6+** - Modern JavaScript features

## 📊 Mock Data

The app includes comprehensive mock data for 50+ tennis courts including:
- Court names and locations
- Ratings and review counts
- Pricing information
- Surface types and amenities
- High-quality images

## 🎨 Design Features

- **Mobile-First Design**: Optimized for mobile devices
- **Modern UI**: Clean cards, shadows, and animations
- **Responsive Layout**: Adapts to different screen sizes
- **Intuitive Navigation**: Easy-to-use interface
- **Professional Styling**: Consistent design language

## 🔧 Development

### Available Scripts

```bash
npm start          # Start Expo development server
npm run android    # Run on Android emulator
npm run ios        # Run on iOS simulator
npm run web        # Run in web browser
```

### Code Structure

- **Components**: Reusable UI components
- **Screens**: Main application screens
- **Data**: Mock data and utilities
- **Styles**: Component-specific styling

## 📱 Screenshots

The app features a modern interface with:
- Clean court listing with search
- Detailed court information
- Interactive review system
- Professional design elements

## 🚀 Performance

- Optimized for mobile performance
- Smooth animations and transitions
- Efficient state management
- Fast search and filtering

## 📝 Notes

- Built for BYOB Sports Frontend Developer Challenge
- Uses mock data for demonstration
- Designed with mobile-first principles
- Clean, maintainable codebase

---

**Built with ❤️ using React Native and Expo**
