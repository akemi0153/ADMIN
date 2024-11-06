module.exports = {
	content: [
	  './pages/**/*.{js,ts,jsx,tsx}',
	  './components/**/*.{js,ts,jsx,tsx}',
	  './app/**/*.{js,ts,jsx,tsx}', // Add this line if you have an app directory
	  './lib/**/*.{js,ts,jsx,tsx}', // Add this line if you have a lib directory
	],
	theme: {
	  extend: {
		colors: {
		  card: {
			DEFAULT: 'hsl(var(--card))',
			foreground: 'hsl(var(--card-foreground))'
		  },
		  popover: {
			DEFAULT: 'hsl(var(--popover))',
			foreground: 'hsl(var(--popover-foreground))'
		  },
		  primary: {
			DEFAULT: 'hsl(var(--primary))',
			foreground: 'hsl(var(--primary-foreground))'
		  },
		  secondary: {
			DEFAULT: 'hsl(var(--secondary))',
			foreground: 'hsl(var(--secondary-foreground))'
		  },
		  muted: {
			DEFAULT: 'hsl(var(--muted))',
			foreground: 'hsl(var(--muted-foreground))'
		  },
		},
	  },
	},
	plugins: [],
  }