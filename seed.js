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
  const hash2 = await bcrypt.hash('Password456');

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
  })

  console.log('TODO: implement seed.js');
  process.exit(0);
})();
