// seed.js
// =============================================================================
//  Seed the database with realistic test data.
//  Run with: npm run seed
//
//  Required minimum:
//    - 2 users
//    - 4 projects (split across the users)
//    - 5 tasks (with embedded subtasks and tags arrays)
//    - 5 notes (some attached to projects, some standalone)
//
//  Use the bcrypt module to hash passwords before inserting users.
//  Use ObjectId references for relationships (projectId, ownerId).
// =============================================================================

require('dotenv').config();
const bcrypt = require('bcryptjs');
const { connect } = require('./db/connection');
const { status } = require('express/lib/response');

(async () => {
  const db = await connect();

  // OPTIONAL: clear existing data so re-seeding is idempotent
  await db.collection('users').deleteMany({});
  await db.collection('projects').deleteMany({});
  await db.collection('tasks').deleteMany({});
  await db.collection('notes').deleteMany({});

  // =============================================================================
  //  TODO: Insert your seed data below.
  //
  //  Hints:
  //    - Hash passwords:   const hash = await bcrypt.hash('password123', 10);
  //    - Capture inserted ids:
  //        const u = await db.collection('users').insertOne({ ... });
  //        const userId = u.insertedId;
  //    - Use those ids when inserting projects/tasks/notes.
  //    - Demonstrate schema flexibility: include at least one optional field
  //      on SOME documents but not all (e.g. dueDate on some tasks only).
  //
  //  Sample task shape:
  //    {
  //      ownerId: <ObjectId>,
  //      projectId: <ObjectId>,
  //      title: "Write report introduction",
  //      status: "todo",
  //      priority: 3,
  //      tags: ["writing", "urgent"],
  //      subtasks: [
  //        { title: "Outline sections", done: true },
  //        { title: "Draft", done: false }
  //      ],
  //      createdAt: new Date()
  //    }
  // =============================================================================


  const hash1 = await bcrypt.hash('Password123', 10);
  const hash2 = await bcrypt.hash('Password456',10);

  const u1 = await db.collection('user').insertOne({
    email: 'zain@zain.com',
    passwordHash: hash1,
    name: 'Zain',
    createdAt: new Date()
  });

  const u2 = await db.collection('user').insertOne({
    email: 'ali@zain.com',
    passwordHash: hash2,
    name: 'Ali',
    createdAt: new Date()
  });

  const zainId = u1.insertId;
  const aliId = u2.insertId;

  const p1 = await db.collection('projects').insertOne({
    ownerId: zainId,
    name: 'FYP',
    archived: false,
    createdAt: new Date()
  });

  const p2 = await db.collection('projects').insertOne({
    ownerId: zainId,
    name: 'WEBSITE',
    archived: false,
    createdAt: new Date()
  });

  const p3 = await db.collection('projects').insertOne({
    ownerId: aliId,
    name: 'InterShip',
    archived: false,
    createdAt: new Date()
  });

  const p4 = await db.collection('projects').insertOne({
    ownerId: aliId,
    name: 'ML',
    archived: false,
    createdAt: new Date()
  });

  const p1Id = p1.insertId;
  const p2Id = p2.insertId;
  const p3Id = p3.insertId;
  const p4Id = p4.insertId;

  await db.collection('tasks').insertOne({
    ownerId: zainId,
    projectId: p1Id,
    title: 'Train in ML',
    status: 'in progress',
    tags: ['ml', 'urgent'],
    subtasks: [
      { title: 'Prepare dataset', done: true },
      { title: 'Run training loop', done: false },
      { title: 'Evaluate accuracy', done: false }
    ],
    dueDate: new Date('2025-05-10'),
    createdAt: new Date()
  });

  await db.collection('tasks').insertOne({
    ownerId: zainId,
    projectId: p1Id,
    title: 'Write project report',
    status: 'todo',
    priority: 4,
    tags: ['writing', 'urgent'],
    subtasks: [
      { title: 'Draft introduction', done: false },
      { title: 'Add methodology section', done: false }
    ],
    createdAt: new Date()            
  });

  await db.collection('tasks').insertOne({
    ownerId: zainId,
    projectId: p2Id,
    title: 'Complete NoSQL lab',
    status: 'in-progress',
    priority: 5,
    tags: ['db', 'lab'],
    subtasks: [
      { title: 'Design schema', done: true },
      { title: 'Write seed.js', done: false },
      { title: 'Implement 15 queries', done: false }
    ],
    dueDate: new Date('2025-04-28'),
    createdAt: new Date()
  });

  await db.collection('tasks').insertOne({
    ownerId: aliId,
    projectId: p3Id,
    title: 'Design homepage layout',
    status: 'done',
    priority: 3,
    tags: ['design', 'frontend'],
    subtasks: [
      { title: 'Wireframe', done: true },
      { title: 'Pick color scheme', done: true }
    ],
    createdAt: new Date()
  });

  await db.collection('tasks').insertOne({
    ownerId: aliId,
    projectId: p4Id,
    title: 'Document old API endpoints',
    status: 'todo',
    priority: 2,
    tags: ['docs'],
    subtasks: [],
    createdAt: new Date()
  });

    await db.collection('notes').insertOne({
    ownerId: zainId,
    projectId: p1Id,           
    title: 'Model architecture ideas',
    body: 'Consider using a transformer.',
    tags: ['ml', 'ideas'],
    createdAt: new Date()
  });

  await db.collection('notes').insertOne({
    ownerId: zainId,
    projectId: p2Id,
    title: 'MongoDB cheat sheet',
    body: 'Remember: $addToSet for no duplicates, $pull to remove, $ positional for embedded arrays.',
    tags: ['db', 'reference'],
    createdAt: new Date()
  });

  await db.collection('notes').insertOne({
    ownerId: zainId,
    title: 'General study tips',
    body: 'Start assignments early. Use analogies to understand concepts.',
    tags: ['personal'],
    createdAt: new Date()
  });

  await db.collection('notes').insertOne({
    ownerId: aliId,
    projectId: p3Id,
    title: 'Font choices',
    body: 'Manrope for headings, Inter for body text.',
    tags: ['design', 'frontend'],
    createdAt: new Date()
  });

  await db.collection('notes').insertOne({
    ownerId: aliId,
    title: 'Book recommendations',
    body: 'Read Clean Code before next semester.',
    tags: ['personal', 'reading'],
    createdAt: new Date()
  });

  console.log('Implement seed.js');
  process.exit(0);
})();
