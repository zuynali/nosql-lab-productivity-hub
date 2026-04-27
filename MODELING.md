# Schema Design — Personal Productivity Hub

> Fill in every section below. Keep answers concise.

---

## 1. Collections Overview

Briefly describe each collection (1–2 sentences each):

- **users** —
- **projects** —
- **tasks** —
- **notes** —

## These are tables which are used in nosql, users stores user, projects stores project, tasks stores tasks belonging to projects and notes are notes

## 2. Document Shapes

For each collection, write the document shape (field name + type + required/optional):

### users

```
{
  _id: ObjectId,
  email: string (required, unique),
  passwordHash: string (required),
  name: string (required),
  createdAt: Date (required)
}
```

### projects

```
TODO

{
_id: ObjectId,
ownerId: ObjectId (required),
name: string (required),
description: string (optional),
archived: boolean (required),
createdAt: Date (required)
}
```

### tasks

```

TODO
_id:ObjectId,
ownerId:Object(required),
projectId:ObjectId(required),
title:string(required),
status: string (required),
tags:array of string,
subtasks: array of objects,
createdAt:Date(required),
dueDate:Date(optional)

```

### notes

```

TODO

```

{
_id: ObjectId,
ownerId: ObjectId (required),
projectId: ObjectId (optional),
title: string (required),
body: string (required),
tags: array of strings,
createdAt: Date (required)
}

---

## 3. Embed vs Reference — Decisions

For each relationship, state whether you embedded or referenced, and **why** (one sentence):

| Relationship                 | Embed or Reference? | Why? |
| ---------------------------- | ------------------- | ---- |
| Subtasks inside a task       |          Embed           |child is owned by the parent      |
| Tags on a task               |          Embed           |Tags will owned by a single parent      |
| Project → Task ownership     |          reference           |There can be multiple owwners of a project      |
| Note → optional Project link |          reference           |Porject will have only a refernece of notes      |

---

## 4. Schema Flexibility Example

Name one field that exists on **some** documents but not **all** in the same collection. Explain why this is acceptable (or even useful) in MongoDB.

> _Your answer here._

```
DueDate is a feild that exists in some document but not all. If we do not need duedate we can skip it in MongoDB
```
