# 步骤三：表单管理系统整合

**预计时间**：1天  
**目标**：提供完善的表单管理功能，包括各种表单类型、字段配置、提交记录管理等。

## 1. 创建表单相关数据库结构

### 1.1 创建数据库迁移文件

- [ ] 创建表单管理相关的数据库迁移
  ```bash
  npm run typeorm migration:create -- -n FormManagementSystem
  ```

- [ ] 在迁移文件中实现表单类型表
  ```typescript
  await queryRunner.query(`
    CREATE TABLE IF NOT EXISTS form_types (
      id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
      name VARCHAR(50) NOT NULL,
      description TEXT,
      created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
      updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
    );
  `);
  ```

### 1.2 创建表单字段和提交记录表

- [ ] 在同一迁移文件中添加表单字段与提交记录表
  ```typescript
  await queryRunner.query(`
    CREATE TABLE IF NOT EXISTS form_fields (
      id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
      form_type_id UUID REFERENCES form_types(id) ON DELETE CASCADE,
      label_en VARCHAR(100) NOT NULL,
      label_zh VARCHAR(100) NOT NULL,
      type VARCHAR(50) NOT NULL,
      required BOOLEAN DEFAULT false,
      options JSONB,
      order INTEGER DEFAULT 0,
      created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
      updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
    );

    CREATE TABLE IF NOT EXISTS form_submissions (
      id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
      form_type_id UUID REFERENCES form_types(id) ON DELETE SET NULL,
      data JSONB NOT NULL,
      created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
      updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
      status VARCHAR(50) DEFAULT 'pending'
    );
  `);
  ```

### 1.3 执行迁移

- [ ] 运行迁移脚本
  ```bash
  npm run typeorm migration:run
  ```

- [ ] 验证数据库结构
  ```bash
  npm run typeorm schema:log
  ```

## 2. 创建实体模型

### 2.1 表单类型实体

- [ ] 创建表单类型实体
  ```typescript
  // src/entities/formType.entity.ts
  @Entity('form_types')
  export class FormType {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column()
    name: string;

    @Column({ nullable: true })
    description: string;

    @CreateDateColumn({ name: 'created_at' })
    createdAt: Date;

    @UpdateDateColumn({ name: 'updated_at' })
    updatedAt: Date;

    @OneToMany(() => FormField, field => field.formType)
    fields: FormField[];

    @OneToMany(() => FormSubmission, submission => submission.formType)
    submissions: FormSubmission[];
  }
  ```

### 2.2 表单字段实体

- [ ] 创建表单字段实体
  ```typescript
  // src/entities/formField.entity.ts
  @Entity('form_fields')
  export class FormField {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column({ name: 'form_type_id' })
    formTypeId: string;

    @ManyToOne(() => FormType, type => type.fields)
    @JoinColumn({ name: 'form_type_id' })
    formType: FormType;

    @Column({ name: 'label_en' })
    labelEn: string;

    @Column({ name: 'label_zh' })
    labelZh: string;

    @Column()
    type: string;

    @Column({ default: false })
    required: boolean;

    @Column('jsonb', { nullable: true })
    options: any;

    @Column({ default: 0 })
    order: number;

    @CreateDateColumn({ name: 'created_at' })
    createdAt: Date;

    @UpdateDateColumn({ name: 'updated_at' })
    updatedAt: Date;
  }
  ```

### 2.3 表单提交记录实体

- [ ] 创建表单提交记录实体
  ```typescript
  // src/entities/formSubmission.entity.ts
  @Entity('form_submissions')
  export class FormSubmission {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column({ name: 'form_type_id', nullable: true })
    formTypeId: string;

    @ManyToOne(() => FormType, type => type.submissions)
    @JoinColumn({ name: 'form_type_id' })
    formType: FormType;

    @Column('jsonb')
    data: any;

    @Column({ default: 'pending' })
    status: string;

    @CreateDateColumn({ name: 'created_at' })
    createdAt: Date;

    @UpdateDateColumn({ name: 'updated_at' })
    updatedAt: Date;
  }
  ```

## 3. 创建表单管理服务和API

### 3.1 表单服务

- [ ] 创建表单管理服务
  ```typescript
  // src/services/forms.service.ts
  @Injectable()
  export class FormsService {
    constructor(
      @InjectRepository(FormType)
      private readonly formTypeRepository: Repository<FormType>,
      @InjectRepository(FormField)
      private readonly formFieldRepository: Repository<FormField>,
      @InjectRepository(FormSubmission)
      private readonly formSubmissionRepository: Repository<FormSubmission>
    ) {}

    async getTypes(): Promise<FormType[]> {
      return this.formTypeRepository.find();
    }

    async getFields(typeId: string): Promise<FormField[]> {
      return this.formFieldRepository.find({
        where: { formTypeId: typeId },
        order: { order: 'ASC' }
      });
    }

    async getSubmissions(query: GetSubmissionsDto): Promise<FormSubmission[]> {
      const { typeId, status, startDate, endDate } = query;
      const queryBuilder = this.formSubmissionRepository.createQueryBuilder('submission');
      
      if (typeId) {
        queryBuilder.where('submission.formTypeId = :typeId', { typeId });
      }
      
      if (status) {
        queryBuilder.andWhere('submission.status = :status', { status });
      }
      
      if (startDate) {
        queryBuilder.andWhere('submission.createdAt >= :startDate', { startDate });
      }
      
      if (endDate) {
        queryBuilder.andWhere('submission.createdAt <= :endDate', { endDate });
      }
      
      return queryBuilder.orderBy('submission.createdAt', 'DESC').getMany();
    }

    async createSubmission(createDto: CreateSubmissionDto): Promise<FormSubmission> {
      return this.formSubmissionRepository.save({
        formTypeId: createDto.formTypeId,
        data: createDto.data
      });
    }

    async updateFormField(id: string, updateDto: UpdateFormFieldDto): Promise<FormField> {
      await this.formFieldRepository.update(id, updateDto);
      return this.formFieldRepository.findOne({ where: { id } });
    }
  }
  ```

### 3.2 表单控制器

- [ ] 创建表单管理控制器
  ```typescript
  // src/controllers/forms.controller.ts
  @Controller('forms')
  export class FormsController {
    constructor(private readonly formsService: FormsService) {}

    @Get('types')
    async getFormTypes() {
      return this.formsService.getTypes();
    }

    @Get('fields/:typeId')
    async getFormFields(@Param('typeId') typeId: string) {
      return this.formsService.getFields(typeId);
    }

    @Get('submissions')
    async getSubmissions(@Query() query: GetSubmissionsDto) {
      return this.formsService.getSubmissions(query);
    }

    @Post('submissions')
    async createSubmission(@Body() createDto: CreateSubmissionDto) {
      return this.formsService.createSubmission(createDto);
    }

    @Put('fields/:id')
    async updateFormField(
      @Param('id') id: string,
      @Body() updateDto: UpdateFormFieldDto
    ) {
      return this.formsService.updateFormField(id, updateDto);
    }
  }
  ```

## 4. 前端表单组件开发

### 4.1 表单配置组件

- [ ] 创建表单字段配置组件
  ```typescript
  // src/components/FormBuilder.tsx
  export const FormBuilder: React.FC<Props> = ({ onSave }) => {
    const [fields, setFields] = useState<FormField[]>([]);

    const addField = (type: FieldType) => {
      setFields(prev => [...prev, {
        id: uuid(),
        type,
        required: false,
        order: prev.length
      }]);
    };

    return (
      <div>
        <FieldTypeToolbar onSelect={addField} />
        <FieldList
          fields={fields}
          onFieldUpdate={(id, updates) => {
            setFields(prev =>
              prev.map(field =>
                field.id === id ? { ...field, ...updates } : field
              )
            );
          }}
          onFieldRemove={(id) => {
            setFields(prev => prev.filter(field => field.id !== id));
          }}
        />
        <Button onClick={() => onSave(fields)}>保存表单</Button>
      </div>
    );
  };
  ```

### 4.2 表单提交组件

- [ ] 创建动态表单提交组件
  ```typescript
  // src/components/DynamicForm.tsx
  export const DynamicForm: React.FC<Props> = ({ formType, onSubmit }) => {
    const { data: formFields } = useQuery(
      ['formFields', formType],
      () => api.getFormFields(formType)
    );

    const { mutate, isLoading } = useMutation(
      (data: FormData) => api.submitForm(formType, data)
    );

    const handleSubmit = async (values: any) => {
      try {
        await mutate(values);
        toast.success('提交成功');
        onSubmit?.(values);
      } catch (error) {
        toast.error('提交失败');
      }
    };

    if (!formFields) return <Spinner />;

    return (
      <Form onSubmit={handleSubmit}>
        {formFields.map(field => (
          <FormField
            key={field.id}
            type={field.type}
            label={field.label}
            required={field.required}
            options={field.options}
          />
        ))}
        <Button type="submit" loading={isLoading}>
          提交
        </Button>
      </Form>
    );
  };
  ```

### 4.3 表单提交记录查询组件

- [ ] 创建表单提交记录查询组件
  ```typescript
  // src/components/FormSubmissionList.tsx
  export const FormSubmissionList: React.FC<Props> = ({ formTypeId }) => {
    const [filters, setFilters] = useState({
      status: '',
      startDate: null,
      endDate: null
    });

    const { data, isLoading, refetch } = useQuery(
      ['formSubmissions', formTypeId, filters],
      () => api.getFormSubmissions(formTypeId, filters)
    );

    if (isLoading) return <Spinner />;

    return (
      <div>
        <FilterPanel
          filters={filters}
          onChange={newFilters => setFilters(newFilters)}
          onApply={refetch}
        />
        <Table>
          <thead>
            <tr>
              <th>提交日期</th>
              <th>状态</th>
              <th>操作</th>
            </tr>
          </thead>
          <tbody>
            {data.map(submission => (
              <tr key={submission.id}>
                <td>{formatDate(submission.createdAt)}</td>
                <td>{getStatusLabel(submission.status)}</td>
                <td>
                  <Button onClick={() => viewSubmissionDetails(submission)}>
                    查看详情
                  </Button>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      </div>
    );
  };
  ```

## 验证标准

完成本阶段后，应该满足以下条件：

1. 数据库中包含表单类型、表单字段和表单提交记录表
2. 可以通过API创建和管理表单类型及字段
3. 前端可以根据表单配置动态生成表单
4. 用户可以提交表单，数据会存储到数据库
5. 管理员可以查看和管理表单提交记录

## 下一步

完成表单管理系统后，继续进行[步骤四：API服务整合](./04-api-integration.md)。
