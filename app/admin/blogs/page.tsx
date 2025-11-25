"use client"

import { useEffect, useState } from "react"
import { Plus, Edit2, Trash2, Loader, Eye, EyeOff } from "lucide-react"
import AdminLayout from "@/components/admin-layout"
import BlogForm from "@/components/admin/blog-form"

interface Blog {
  _id: string
  title: string
  slug: string
  excerpt: string
  content: string
  image: string
  category: string
  tags: string[]
  published: boolean
  publishedAt: string | null
}

export default function BlogsPage() {
  const [blogs, setBlogs] = useState<Blog[]>([])
  const [loading, setLoading] = useState(true)
  const [showForm, setShowForm] = useState(false)
  const [editingBlog, setEditingBlog] = useState<Blog | null>(null)

  useEffect(() => {
    fetchBlogs()
  }, [])

  const fetchBlogs = async () => {
    try {
      setLoading(true)
      const response = await fetch("/api/blogs")
      const data = await response.json()
      setBlogs(Array.isArray(data) ? data : [])
    } catch (error) {
      console.error("Failed to fetch blogs:", error)
    } finally {
      setLoading(false)
    }
  }

  const handleDelete = async (id: string) => {
    if (!confirm("Are you sure you want to delete this blog post?")) return

    try {
      await fetch(`/api/blogs/${id}`, { method: "DELETE" })
      setBlogs(blogs.filter((b) => b._id !== id))
    } catch (error) {
      console.error("Failed to delete blog:", error)
    }
  }

  const togglePublished = async (blog: Blog) => {
    try {
      const response = await fetch(`/api/blogs/${blog._id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ published: !blog.published }),
      })
      if (response.ok) {
        const updated = await response.json()
        setBlogs(blogs.map((b) => (b._id === blog._id ? updated : b)))
      }
    } catch (error) {
      console.error("Failed to update blog:", error)
    }
  }

  const handleFormClose = () => {
    setShowForm(false)
    setEditingBlog(null)
  }

  const handleFormSubmit = () => {
    fetchBlogs()
    handleFormClose()
  }

  return (
    <AdminLayout>
      <div className="max-w-7xl mx-auto">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Blog Posts</h1>
          <button
            onClick={() => {
              setEditingBlog(null)
              setShowForm(!showForm)
            }}
            className="px-4 py-2 bg-[var(--gold)] text-[var(--charcoal)] rounded font-medium flex items-center gap-2 hover:bg-[var(--gold-accent)] transition"
          >
            <Plus size={20} /> New Blog Post
          </button>
        </div>

        {showForm && (
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-8 mb-8">
            <h2 className="text-xl font-semibold text-gray-900 mb-6">
              {editingBlog ? "Edit Blog Post" : "Create New Blog Post"}
            </h2>
            <BlogForm blog={editingBlog} onSubmit={handleFormSubmit} onCancel={handleFormClose} />
          </div>
        )}

        {loading ? (
          <div className="flex justify-center items-center h-64">
            <Loader className="animate-spin text-gray-600" size={32} />
          </div>
        ) : (
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
            {blogs.length === 0 ? (
              <div className="p-8 text-center text-gray-500">No blog posts yet. Create your first one!</div>
            ) : (
              <table className="w-full">
                <thead className="bg-gray-50 border-b border-gray-200">
                  <tr>
                    <th className="text-left py-4 px-6 font-semibold text-gray-900">Title</th>
                    <th className="text-left py-4 px-6 font-semibold text-gray-900">Category</th>
                    <th className="text-left py-4 px-6 font-semibold text-gray-900">Status</th>
                    <th className="text-left py-4 px-6 font-semibold text-gray-900">Published Date</th>
                    <th className="text-left py-4 px-6 font-semibold text-gray-900">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {blogs.map((blog) => (
                    <tr key={blog._id} className="border-b border-gray-100 hover:bg-gray-50">
                      <td className="py-4 px-6">
                        <div>
                          <p className="font-medium text-gray-900">{blog.title}</p>
                          <p className="text-sm text-gray-500">{blog.slug}</p>
                        </div>
                      </td>
                      <td className="py-4 px-6 capitalize text-gray-700">{blog.category || "—"}</td>
                      <td className="py-4 px-6">
                        <button
                          onClick={() => togglePublished(blog)}
                          className={`flex items-center gap-2 px-3 py-1 rounded text-sm font-medium ${
                            blog.published ? "bg-green-100 text-green-800" : "bg-gray-100 text-gray-800"
                          }`}
                        >
                          {blog.published ? (
                            <>
                              <Eye size={14} /> Published
                            </>
                          ) : (
                            <>
                              <EyeOff size={14} /> Draft
                            </>
                          )}
                        </button>
                      </td>
                      <td className="py-4 px-6 text-gray-500">
                        {blog.publishedAt ? new Date(blog.publishedAt).toLocaleDateString() : "—"}
                      </td>
                      <td className="py-4 px-6">
                        <div className="flex items-center gap-2">
                          <button
                            onClick={() => {
                              setEditingBlog(blog)
                              setShowForm(true)
                            }}
                            className="text-blue-600 hover:text-blue-800 p-1"
                          >
                            <Edit2 size={18} />
                          </button>
                          <button
                            onClick={() => handleDelete(blog._id)}
                            className="text-red-600 hover:text-red-800 p-1"
                          >
                            <Trash2 size={18} />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            )}
          </div>
        )}
      </div>
    </AdminLayout>
  )
}
