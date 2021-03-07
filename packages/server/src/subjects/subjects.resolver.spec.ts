import { getModelToken, MongooseModule } from '@nestjs/mongoose';
import { Test, TestingModule } from '@nestjs/testing';
import { subjectNameError } from '../utils/exceptions';
import {
  closeInMongodConnection,
  rootMongooseTestModule,
} from '../utils/mongo';
import { CreateSubjectInput } from './dto/create-subject.input';
import { Subject, SubjectSchema } from './schemas/subject.schema';
import { SubjectsResolver } from './subjects.resolver';
import { SubjectsService } from './subjects.service';

describe('SubjectsResolver', () => {
  let resolver: SubjectsResolver;
  const subject = {
    subjectName: 'Computer Science',
  } as CreateSubjectInput;
  afterAll(() => {
    closeInMongodConnection();
  });
  beforeAll(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [
        rootMongooseTestModule(),
        MongooseModule.forFeature([
          { name: Subject.name, schema: SubjectSchema },
        ]),
      ],
      providers: [SubjectsResolver, SubjectsService],
    }).compile();

    resolver = module.get<SubjectsResolver>(SubjectsResolver);
  });

  describe('create Subject', () => {
    it('should return a Subject', async () => {
      const result = await resolver.createSubject(subject);
      expect(result).toBeTruthy();
    });
    it('should throw error when Subjectname already exists', async () => {
      try {
        await resolver.createSubject(subject);
      } catch (error) {
        expect(error.message).toBe(`Error: ${subjectNameError}`);
      }
    });
  });

  describe('update Subject', () => {
    it('should return updated Subject', async () => {
      const subjects = await resolver.findAll();

      const [subject] = subjects;
      subject.subjectName = 'the name has been changed';

      const response = await resolver.updateSubject({
        ...subject,
        id: subject.id,
      } as any);
      expect(response).toHaveProperty('subjectName', subject.subjectName);
    });
  });

  it('should be defined', () => {
    expect(resolver).toBeDefined();
  });
});
