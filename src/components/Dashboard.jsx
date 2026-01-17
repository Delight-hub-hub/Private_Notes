import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { supabase } from './supabaseClient'

function Dashboard() {
  const navigate = useNavigate()
  const [notes, setNotes] = useState([])
  const [title, setTitle] = useState('')
  const [content, setContent] = useState('')
  const [editingId, setEditingId] = useState(null)
  const [searchTerm, setSearchTerm] = useState('')
  const [loading, setLoading] = useState(true)

  const fetchNotes = async () => {
    setLoading(true)
    const { data, error } = await supabase
      .from('notes') 
      .select('*')
      .order('created_at', { ascending: false })

    if (error) {
      console.error('Error fetching notes:', error.message)
    } else {
      setNotes(data)
    }
    setLoading(false)
  }

  
  useEffect(() => {
    const loadNotes = async () => {
      setLoading(true)
      const { data, error } = await supabase
        .from('notes')
        .select('*')
        .order('created_at', { ascending: false })

      if (error) {
        console.error('Error fetching notes:', error.message)
      } else {
        setNotes(data)
      }
      setLoading(false)
    }

    loadNotes()
  }, [])

  const handleAddNote = async () => {
    if (!title.trim() || !content.trim()) {
      alert('Please fill in both title and content')
      return
    }

    if (editingId) {
      // 2. UPDATE existing note in Supabase
      const { error } = await supabase
        .from('notes')
        .update({ title, content })
        .eq('id', editingId)

      if (error) alert(error.message)
      else {
        setEditingId(null)
        fetchNotes() // Refresh list
      }
    } else {
      // 3. CREATE new note in Supabase
      const { error } = await supabase
        .from('notes')
        .insert([{ title, content }]) 

      if (error) alert(error.message)
      else fetchNotes()
    }

    setTitle('')
    setContent('')
  }

  const handleEditNote = (note) => {
    setTitle(note.title)
    setContent(note.content)
    setEditingId(note.id)
  }

  const handleDeleteNote = async (id) => {
    if (confirm('Are you sure you want to delete this note?')) {
      // 4. DELETE from Supabase
      const { error } = await supabase
        .from('notes')
        .delete()
        .eq('id', id)

      if (error) alert(error.message)
      else fetchNotes()
    }
  }

  const handleCancel = () => {
    setTitle('')
    setContent('')
    setEditingId(null)
  }

  const handleLogout = async () => {
    await supabase.auth.signOut()
    navigate('/login')
  }

  const filteredNotes = notes.filter(note =>
    note.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    note.content.toLowerCase().includes(searchTerm.toLowerCase())
  )

  return (
    <div className="min-h-screen bg-linear-to-br from-blue-500 via-purple-500 to-purple-700">
      <header className="bg-black bg-opacity-30 shadow-lg">
        <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">
          <h1 className="text-3xl font-bold text-white">My Notes</h1>
          <button onClick={handleLogout} className="px-6 py-2 bg-white text-blue-600 font-semibold rounded-lg hover:bg-gray-100 transition duration-300">
            Logout
          </button>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-6 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Create/Edit Note Form */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-lg shadow-lg p-6 sticky top-8">
              <h2 className="text-2xl font-bold text-gray-800 mb-6">{editingId ? 'Edit Note' : 'Create New Note'}</h2>
              
              <input
                type="text"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="Note Title"
                className="w-full px-4 py-3 mb-4 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-200 font-semibold"
              />
              
              <textarea
                value={content}
                onChange={(e) => setContent(e.target.value)}
                placeholder="Note Content"
                className="w-full px-4 py-3 mb-4 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-200 resize-vertical min-h-50"
              />
              
              <div className="flex gap-3">
                <button 
                  onClick={handleAddNote} 
                  className="flex-1 px-4 py-3 bg-linear-to-r from-blue-500 to-purple-600 hover:opacity-90 text-white font-semibold rounded-lg transition duration-300"
                >
                  {editingId ? 'Update Note' : 'Add Note'}
                </button>
                {editingId && (
                  <button 
                    onClick={handleCancel} 
                    className="flex-1 px-4 py-3 bg-red-500 hover:bg-red-600 text-white font-semibold rounded-lg transition duration-300"
                  >
                    Cancel
                  </button>
                )}
              </div>
            </div>
          </div>

          {/* Notes List Section */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-lg shadow-lg p-6">
              {/* Search Bar */}
              <div className="mb-6">
                <input
                  type="text"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  placeholder="Search notes..."
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-200"
                />
              </div>

              {/* Notes Grid */}
              {loading ? (
                <div className="text-center py-12">
                  <p className="text-gray-500 text-lg">Loading...</p>
                </div>
              ) : filteredNotes.length === 0 ? (
                <div className="text-center py-12">
                  <p className="text-gray-500 text-lg">
                    {searchTerm ? 'No notes found' : 'No notes yet. Create your first note!'}
                  </p>
                </div>
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {filteredNotes.map(note => (
                    <div key={note.id} className="bg-gray-50 border border-gray-200 rounded-lg p-4 hover:shadow-lg hover:border-blue-300 transition duration-300">
                      <h3 className="text-lg font-bold text-gray-800 mb-3 truncate">{note.title}</h3>
                      <p className="text-gray-600 text-sm mb-3 line-clamp-3">{note.content}</p>
                      <div className="mb-4 pb-3 border-t border-gray-200">
                        <small className="text-gray-500">
                          Created: {new Date(note.created_at).toLocaleDateString()}
                        </small>
                      </div>
                      <div className="flex gap-2">
                        <button 
                          onClick={() => handleEditNote(note)} 
                          className="flex-1 px-3 py-2 bg-blue-500 hover:bg-blue-600 text-white text-sm font-semibold rounded transition duration-300"
                        >
                          Edit
                        </button>
                        <button 
                          onClick={() => handleDeleteNote(note.id)} 
                          className="flex-1 px-3 py-2 bg-red-500 hover:bg-red-600 text-white text-sm font-semibold rounded transition duration-300"
                        >
                          Delete
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Dashboard