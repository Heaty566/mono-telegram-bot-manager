import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class PaymentChecker {
      @PrimaryGeneratedColumn('uuid')
      id: string;

      @Column({ nullable: true })
      activeCode: string;

      @Column({ nullable: false })
      amount: number;

      @Column({ nullable: false })
      createDate: Date;

      @Column({ nullable: false })
      isActive: boolean;

      @Column({ nullable: true })
      sender: string;
}
