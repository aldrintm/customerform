'use client'
import { useState } from 'react'

export default function ProjectTabs({ children, project, customer }) {
  const [activeTab, setActiveTab] = useState('details')

  const tabs = [
    { id: 'details', label: 'Project Details' },
    { id: 'actions', label: 'Action Buttons' },
  ]

  return (
    <div className='w-full'>
      {/* Tab Navigation */}
      <div className='border-b border-gray-200'>
        <nav className='-mb-px flex space-x-8' aria-label='Tabs'>
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`
                whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm
                ${
                  activeTab === tab.id
                    ? 'border-blue-500 text-blue-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                }
              `}
            >
              {tab.label}
            </button>
          ))}
        </nav>
      </div>

      {/* Tab Content */}
      <div className='mt-4'>
        {activeTab === 'details' && (
          <div className='space-y-4'>
            {/* Project Details Content */}
            <dl className='mt-1'>
              {/* Your existing project details content */}
              {children}
            </dl>
          </div>
        )}

        {activeTab === 'actions' && (
          <div className='space-y-4 p-4'>
            <div className='flex flex-wrap gap-4'>
              <Button onClick={() => handleEditProjectClick(project._id)}>
                Edit Project
              </Button>
              <Button onClick={() => handleSendEmail(customer.email)}>
                Send Email
              </Button>
              <Button
                onClick={() => handleDeleteProject(project._id, customer)}
              >
                Delete Project
              </Button>
              <Button onClick={printProjectInfo}>Print Project Info</Button>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
