import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcryptjs';

const prisma = new PrismaClient();

async function main() {
  console.log('🌱 Starting database seeding...');

  // Create default roles
  const userRole = await prisma.role.upsert({
    where: { name: 'user' },
    update: {},
    create: {
      name: 'user',
      description: 'Default user role with basic permissions',
      canCreatePosts: true,
      canModeratePosts: false,
      canManageUsers: false,
      canViewReports: false,
      canManageCompany: false,
      canAdminSystem: false,
    },
  });

  const moderatorRole = await prisma.role.upsert({
    where: { name: 'moderator' },
    update: {},
    create: {
      name: 'moderator',
      description: 'Moderator role with content moderation permissions',
      canCreatePosts: true,
      canModeratePosts: true,
      canManageUsers: false,
      canViewReports: true,
      canManageCompany: false,
      canAdminSystem: false,
    },
  });

  const adminRole = await prisma.role.upsert({
    where: { name: 'admin' },
    update: {},
    create: {
      name: 'admin',
      description: 'Administrator role with full system permissions',
      canCreatePosts: true,
      canModeratePosts: true,
      canManageUsers: true,
      canViewReports: true,
      canManageCompany: true,
      canAdminSystem: true,
    },
  });

  console.log('✅ Roles created:', { userRole, moderatorRole, adminRole });

  // Create default admin user
  const hashedPassword = await bcrypt.hash('admin123', 12);
  
  const adminUser = await prisma.user.upsert({
    where: { email: 'admin@sindicapp.com' },
    update: {},
    create: {
      email: 'admin@sindicapp.com',
      username: 'admin',
      password: hashedPassword,
      firstName: 'System',
      lastName: 'Administrator',
      emailVerified: true,
      isActive: true,
      profilePublic: false,
      roleId: adminRole.id,
    },
  });

  console.log('✅ Admin user created:', { 
    id: adminUser.id, 
    email: adminUser.email, 
    username: adminUser.username 
  });

  // Create sample regular user
  const userPassword = await bcrypt.hash('user123', 12);
  
  const sampleUser = await prisma.user.upsert({
    where: { email: 'user@example.com' },
    update: {},
    create: {
      email: 'user@example.com',
      username: 'sampleuser',
      password: userPassword,
      firstName: 'John',
      lastName: 'Doe',
      emailVerified: true,
      isActive: true,
      profilePublic: true,
      roleId: userRole.id,
    },
  });

  console.log('✅ Sample user created:', { 
    id: sampleUser.id, 
    email: sampleUser.email, 
    username: sampleUser.username 
  });

  console.log('🎉 Database seeding completed successfully!');
}

main()
  .catch((e) => {
    console.error('❌ Error during seeding:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  }); 