let tasks = [] // Store tasks in memory (you can replace this with a database later)

export async function GET(req) {
  return new Response(JSON.stringify(tasks), {
    headers: { 'Content-Type': 'application/json' },
  })
}

export async function POST(req) {
  const newTask = await req.json()
  tasks.push(newTask) // Add new task
  return new Response(JSON.stringify(newTask), {
    status: 201,
    headers: { 'Content-Type': 'application/json' },
  })
}

export async function DELETE(req) {
  const { id } = await req.json()
  tasks = tasks.filter((task) => task.id !== id) // Delete task by id
  return new Response(JSON.stringify({ message: 'Task deleted' }), {
    status: 200,
    headers: { 'Content-Type': 'application/json' },
  })
}
