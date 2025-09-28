import React from 'react'
import { motion } from 'framer-motion'

const ProfilePage = () => {
  const mockUser = {
    name: 'Alex Johnson',
    email: 'alex.johnson@example.com',
    phone: '+1 (555) 012-3456',
    joined: 'Mar 2024',
    level: 'Intermediate',
    totalInterviews: 12,
    averageScore: 8.5,
    improvementRate: '+15%'
  }

  const history = [
    { 
      id: 1, 
      date: '2025-09-10', 
      role: 'Frontend Engineer', 
      company: 'TechCorp', 
      score: 8.9, 
      duration: '42m',
      status: 'Completed',
      feedback: 'Excellent technical skills and communication'
    },
    { 
      id: 2, 
      date: '2025-08-28', 
      role: 'Product Manager', 
      company: 'NovaApps', 
      score: 8.3, 
      duration: '38m',
      status: 'Completed',
      feedback: 'Strong leadership and strategic thinking'
    },
    { 
      id: 3, 
      date: '2025-08-14', 
      role: 'Data Scientist', 
      company: 'DataFlow', 
      score: 7.8, 
      duration: '47m',
      status: 'Completed',
      feedback: 'Good analytical skills, needs improvement in presentation'
    },
    { 
      id: 4, 
      date: '2025-08-01', 
      role: 'UX Designer', 
      company: 'DesignStudio', 
      score: 8.1, 
      duration: '35m',
      status: 'Completed',
      feedback: 'Creative problem-solving and user empathy'
    }
  ]

  const skills = [
    { name: 'Technical Communication', progress: 85, color: 'from-blue-500 to-cyan-500' },
    { name: 'Problem Solving', progress: 78, color: 'from-purple-500 to-pink-500' },
    { name: 'Leadership', progress: 72, color: 'from-green-500 to-emerald-500' },
    { name: 'Presentation', progress: 68, color: 'from-orange-500 to-red-500' }
  ]

  return (
    <div className="relative overflow-hidden min-h-screen">
      {/* Background elements */}
      <div className="absolute inset-0">
        <motion.div 
          className="absolute top-20 right-20 w-80 h-80 bg-blue-600/10 rounded-full blur-3xl"
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
          className="absolute bottom-20 left-20 w-96 h-96 bg-purple-600/10 rounded-full blur-3xl"
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
            <span className="text-white">User</span>
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-blue-400 via-purple-400 to-cyan-400 ml-4">
              Profile
            </span>
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="text-xl text-slate-300"
          >
            Track your interview progress and performance
          </motion.p>
        </motion.div>

        {/* User Info Card */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="grid lg:grid-cols-3 gap-8 mb-12"
        >
          {/* Profile Card */}
          <motion.div
            whileHover={{ scale: 1.02 }}
            className="lg:col-span-1 p-8 rounded-2xl bg-white/5 backdrop-blur-sm border border-white/10"
          >
            <div className="text-center">
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ duration: 0.5, delay: 0.8 }}
                className="w-24 h-24 rounded-full bg-gradient-to-r from-blue-500 via-purple-500 to-cyan-400 mx-auto mb-6 flex items-center justify-center text-2xl font-bold text-white"
              >
                {mockUser.name.split(' ').map(n => n[0]).join('')}
              </motion.div>
              <h2 className="text-2xl font-bold text-white mb-2">{mockUser.name}</h2>
              <p className="text-slate-400 mb-6">Member since {mockUser.joined}</p>
              
              <div className="space-y-3 text-left">
                <div className="flex justify-between">
                  <span className="text-slate-400">Email:</span>
                  <span className="text-white">{mockUser.email}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-400">Phone:</span>
                  <span className="text-white">{mockUser.phone}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-400">Level:</span>
                  <span className="text-blue-400 font-semibold">{mockUser.level}</span>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Stats Cards */}
          <div className="lg:col-span-2 grid grid-cols-2 gap-6">
            {[
              { label: 'Total Interviews', value: mockUser.totalInterviews, icon: '📊', color: 'from-blue-500 to-cyan-500' },
              { label: 'Average Score', value: mockUser.averageScore, icon: '⭐', color: 'from-purple-500 to-pink-500' },
              { label: 'Improvement', value: mockUser.improvementRate, icon: '📈', color: 'from-green-500 to-emerald-500' },
              { label: 'Success Rate', value: '92%', icon: '🎯', color: 'from-orange-500 to-red-500' }
            ].map((stat, index) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5, delay: 0.8 + index * 0.1 }}
                whileHover={{ scale: 1.05 }}
                className="p-6 rounded-2xl bg-white/5 backdrop-blur-sm border border-white/10 text-center"
              >
                <div className="text-3xl mb-3">{stat.icon}</div>
                <div className="text-3xl font-bold text-white mb-2">{stat.value}</div>
                <div className="text-slate-400 text-sm">{stat.label}</div>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Skills Progress */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 1.0 }}
          className="mb-12"
        >
          <h3 className="text-2xl font-bold text-white mb-8">Skill Progress</h3>
          <div className="grid md:grid-cols-2 gap-6">
            {skills.map((skill, index) => (
              <motion.div
                key={skill.name}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5, delay: 1.2 + index * 0.1 }}
                className="p-6 rounded-2xl bg-white/5 backdrop-blur-sm border border-white/10"
              >
                <div className="flex justify-between items-center mb-3">
                  <span className="text-white font-medium">{skill.name}</span>
                  <span className="text-blue-400 font-semibold">{skill.progress}%</span>
                </div>
                <div className="w-full bg-slate-700 rounded-full h-3">
                  <motion.div
                    initial={{ width: 0 }}
                    animate={{ width: `${skill.progress}%` }}
                    transition={{ duration: 1, delay: 1.4 + index * 0.1 }}
                    className={`h-3 rounded-full bg-gradient-to-r ${skill.color}`}
                  />
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Interview History */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 1.4 }}
        >
          <h3 className="text-2xl font-bold text-white mb-8">Interview History</h3>
          <div className="space-y-4">
            {history.map((interview, index) => (
              <motion.div
                key={interview.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 1.6 + index * 0.1 }}
                whileHover={{ scale: 1.02 }}
                className="p-6 rounded-2xl bg-white/5 backdrop-blur-sm border border-white/10 hover:bg-white/10 transition-all duration-300"
              >
                <div className="flex flex-col md:flex-row md:items-center md:justify-between">
                  <div className="flex-1">
                    <h4 className="text-xl font-semibold text-white mb-2">{interview.role}</h4>
                    <p className="text-blue-400 mb-2">{interview.company}</p>
                    <p className="text-slate-300 text-sm mb-2">{interview.feedback}</p>
                    <div className="flex items-center space-x-4 text-sm text-slate-400">
                      <span>📅 {interview.date}</span>
                      <span>⏱️ {interview.duration}</span>
                    </div>
                  </div>
                  <div className="flex items-center space-x-4 mt-4 md:mt-0">
                    <div className="text-right">
                      <div className="text-3xl font-bold text-white">{interview.score}</div>
                      <div className="text-sm text-slate-400">Score</div>
                    </div>
                    <div className="px-4 py-2 bg-green-500/20 text-green-400 rounded-full text-sm font-medium">
                      {interview.status}
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </div>
  )
}

export default ProfilePage
