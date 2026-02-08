import {
  type User,
  type InsertUser,
  type InsertContact,
  type ContactSubmission,
} from "@shared/schema";
import { randomUUID } from "crypto";

export interface IStorage {
  getUser(id: string): Promise<User | undefined>;
  getUserByUsername(username: string): Promise<User | undefined>;
  createUser(user: InsertUser): Promise<User>;
  createContactSubmission(
    submission: InsertContact,
  ): Promise<ContactSubmission>;
}

export class MemStorage implements IStorage {
  private users: Map<string, User>;
  private contacts: Map<string, ContactSubmission>;

  constructor() {
    this.users = new Map();
    this.contacts = new Map();
  }

  async getUser(id: string): Promise<User | undefined> {
    return this.users.get(id);
  }

  async getUserByUsername(username: string): Promise<User | undefined> {
    return Array.from(this.users.values()).find(
      (user) => user.username === username,
    );
  }

  async createUser(insertUser: InsertUser): Promise<User> {
    const id = randomUUID();
    const user: User = { ...insertUser, id };
    this.users.set(id, user);
    return user;
  }

  async createContactSubmission(
    submission: InsertContact,
  ): Promise<ContactSubmission> {
    const id = randomUUID();
    const contact: ContactSubmission = {
      ...submission,
      id,
      createdAt: new Date(),
    };
    this.contacts.set(id, contact);
    console.log(this.contacts);
    return contact;
  }
}

export const storage = new MemStorage();
