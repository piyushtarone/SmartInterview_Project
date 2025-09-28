import React from 'react'
import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'

const AboutPage = () => {
  const features = [
    {
      icon: '🤖',
      title: 'AI-Powered Analysis',
      description: 'Advanced AI algorithms analyze your responses, body language, and communication skills in real-time.',
      color: 'from-blue-500 to-cyan-500'
    },
    {
      icon: '🎯',
      title: 'Personalized Feedback',
      description: 'Get detailed insights and recommendations tailored to your specific interview performance.',
      color: 'from-purple-500 to-pink-500'
    },
    {
      icon: '⚡',
      title: 'Real-time Practice',
      description: 'Practice with our intelligent interviewer that adapts to your skill level and provides instant feedback.',
      color: 'from-green-500 to-emerald-500'
    },
    {
      icon: '👥',
      title: 'Industry Experts',
      description: 'Questions and scenarios designed by industry professionals from top tech companies.',
      color: 'from-orange-500 to-red-500'
    },
    {
      icon: '📊',
      title: 'Progress Tracking',
      description: 'Monitor your improvement with detailed analytics and performance metrics over time.',
      color: 'from-indigo-500 to-purple-500'
    },
    {
      icon: '🌐',
      title: 'Global Access',
      description: 'Practice interviews for various roles and industries from anywhere in the world.',
      color: 'from-teal-500 to-blue-500'
    }
  ]

  const stats = [
    { number: '10,000+', label: 'Successful Interviews', icon: '🎉' },
    { number: '95%', label: 'Success Rate', icon: '📈' },
    { number: '50+', label: 'Industry Partners', icon: '🏢' },
    { number: '24/7', label: 'Available', icon: '⏰' }
  ]

  return (
    <div className="relative overflow-hidden min-h-screen">
      {/* Background elements */}
      <div className="absolute inset-0">
        <motion.div 
          className="absolute top-40 right-40 w-80 h-80 bg-purple-600/10 rounded-full blur-3xl"
          animate={{ 
            scale: [1, 1.2, 1],
            rotate: [0, 180, 360]
          }}
          transition={{ 
            duration: 20,
            repeat: Infinity,
            ease: "linear"
          }}
        />
        <motion.div 
          className="absolute bottom-40 left-40 w-96 h-96 bg-blue-600/10 rounded-full blur-3xl"
          animate={{ 
            scale: [1.2, 1, 1.2],
            rotate: [360, 180, 0]
          }}
          transition={{ 
            duration: 25,
            repeat: Infinity,
            ease: "linear"
          }}
        />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 relative z-10">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-20"
        >
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-5xl lg:text-6xl font-bold mb-6"
          >
            <span className="text-white">About</span>
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-blue-400 via-purple-400 to-cyan-400 ml-4">
              AceAI
            </span>
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="text-xl text-slate-300 max-w-3xl mx-auto leading-relaxed"
          >
            Revolutionizing interview preparation with cutting-edge AI technology. 
            Our platform provides an immersive, realistic interview experience that helps you 
            build confidence and master the skills needed to succeed.
          </motion.p>
        </motion.div>

        {/* Stats */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="grid grid-cols-2 lg:grid-cols-4 gap-8 mb-20"
        >
          {stats.map((stat, index) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, delay: 0.8 + index * 0.1 }}
              whileHover={{ scale: 1.05 }}
              className="text-center p-6 rounded-2xl bg-white/5 backdrop-blur-sm border border-white/10 hover:bg-white/10 transition-all duration-300"
            >
              <div className="text-3xl mb-2">{stat.icon}</div>
              <div className="text-3xl font-bold text-blue-400 mb-2">{stat.number}</div>
              <div className="text-slate-300">{stat.label}</div>
            </motion.div>
          ))}
        </motion.div>

        {/* Features Grid */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.8 }}
          className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-20"
        >
          {features.map((feature, index) => (
            <motion.div
              key={feature.title}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 1 + index * 0.1 }}
              whileHover={{ 
                scale: 1.05,
                rotateY: 5,
                rotateX: 5
              }}
              className="group p-8 rounded-2xl bg-white/5 backdrop-blur-sm border border-white/10 hover:bg-white/10 transition-all duration-300"
            >
              <motion.div
                className="w-16 h-16 rounded-2xl bg-gradient-to-r mb-6 flex items-center justify-center text-2xl"
                style={{ background: `linear-gradient(135deg, var(--tw-gradient-stops))` }}
                whileHover={{ rotate: 360 }}
                transition={{ duration: 0.5 }}
              >
                {feature.icon}
              </motion.div>
              <h3 className="text-xl font-semibold text-white mb-4 group-hover:text-blue-400 transition-colors">
                {feature.title}
              </h3>
              <p className="text-slate-300 leading-relaxed">{feature.description}</p>
            </motion.div>
          ))}
        </motion.div>

        {/* How it works */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 1.2 }}
          className="text-center"
        >
          <h2 className="text-4xl font-bold text-white mb-12">How It Works</h2>
          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                step: '1',
                title: 'Choose Your Role',
                description: 'Select from various job positions and industries to practice relevant interview scenarios.',
                icon: '🎯'
              },
              {
                step: '2',
                title: 'AI Interview',
                description: 'Engage with our AI interviewer that asks realistic questions and evaluates your responses.',
                icon: '🤖'
              },
              {
                step: '3',
                title: 'Get Feedback',
                description: 'Receive detailed analysis and personalized recommendations to improve your interview skills.',
                icon: '📊'
              }
            ].map((step, index) => (
              <motion.div
                key={step.step}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 1.4 + index * 0.2 }}
                whileHover={{ scale: 1.05 }}
                className="relative"
              >
                <div className="w-20 h-20 rounded-full bg-gradient-to-r from-blue-500 to-purple-500 flex items-center justify-center text-2xl font-bold text-white mx-auto mb-6">
                  {step.step}
                </div>
                <div className="text-4xl mb-4">{step.icon}</div>
                <h3 className="text-xl font-semibold text-white mb-4">{step.title}</h3>
                <p className="text-slate-300">{step.description}</p>
                {index < 2 && (
                  <div className="hidden md:block absolute top-10 left-full w-full h-0.5 bg-gradient-to-r from-blue-500 to-purple-500 transform translate-x-4" />
                )}
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 1.8 }}
          className="text-center mt-20"
        >
          <motion.div
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <Link
              to="/contact"
              className="inline-block px-8 py-4 rounded-xl text-slate-900 font-semibold shadow-lg shadow-blue-900/30 hover:shadow-blue-900/50 transition-all duration-300
              bg-gradient-to-r from-blue-400 via-purple-400 to-cyan-400 hover:from-blue-300 hover:via-purple-300 hover:to-cyan-300"
            >
              Get Started Today
            </Link>
          </motion.div>
        </motion.div>
      </div>
    </div>
  )
}

export default AboutPage
# New updated About page
