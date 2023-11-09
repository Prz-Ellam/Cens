import { connection } from '@/config/database';
import type { AuthRequest } from '@/middlewares/auth.middleware';
import Option from '@/models/option.model';
import type { Response } from 'express';

class OptionController {
    async findByGender(_req: AuthRequest, res: Response): Promise<Response> {
        // TODO: Solo el dueño de la encuesta deberia ver esto
        const results = await connection
            .createQueryBuilder()
            .select('o.text', 'option')
            .addSelect(
                'CAST(IFNULL(SUM(CASE WHEN u.gender = :male THEN 1 ELSE 0 END) / COUNT(v.id) * 100, 0) AS FLOAT)',
                'male',
            )
            .addSelect(
                'CAST(IFNULL(SUM(CASE WHEN u.gender = :female THEN 1 ELSE 0 END) / COUNT(v.id) * 100, 0) AS FLOAT)',
                'female',
            )
            .addSelect(
                'CAST(IFNULL(SUM(CASE WHEN u.gender IS NULL THEN 1 ELSE 0 END) / COUNT(v.id) * 100, 0) AS FLOAT)',
                'other',
            )
            .from(Option, 'o')
            .leftJoin('votes', 'v', 'o.id = v.option_id')
            .leftJoin('users', 'u', 'v.user_id = u.id')
            .where('o.poll_id = :pollId', { pollId: 1 })
            .groupBy('o.id')
            .setParameters({ male: 'masculino', female: 'femenino' })
            .getRawMany();

        return res.json(results);
    }

    async findByAge(_req: AuthRequest, res: Response): Promise<Response> {
        const results = await connection
            .createQueryBuilder()
            .select('options.text', 'option')
            .addSelect(
                `CAST(IFNULL(SUM(CASE WHEN TIMESTAMPDIFF(YEAR, u.birth_date, CURDATE()) BETWEEN 18 AND 24 THEN 1 ELSE 0 END) / COUNT(v.id) * 100, 0) AS FLOAT)`,
                '18-24',
            )
            .addSelect(
                `CAST(IFNULL(SUM(CASE WHEN TIMESTAMPDIFF(YEAR, u.birth_date, CURDATE()) BETWEEN 25 AND 34 THEN 1 ELSE 0 END) / COUNT(v.id) * 100, 0) AS FLOAT)`,
                '25-34',
            )
            .addSelect(
                `CAST(IFNULL(SUM(CASE WHEN TIMESTAMPDIFF(YEAR, u.birth_date, CURDATE()) BETWEEN 35 AND 44 THEN 1 ELSE 0 END) / COUNT(v.id) * 100, 0) AS FLOAT)`,
                '35-44',
            )
            .addSelect(
                `CAST(IFNULL(SUM(CASE WHEN TIMESTAMPDIFF(YEAR, u.birth_date, CURDATE()) BETWEEN 45 AND 54 THEN 1 ELSE 0 END) / COUNT(v.id) * 100, 0) AS FLOAT)`,
                '45-54',
            )
            .addSelect(
                `CAST(IFNULL(SUM(CASE WHEN TIMESTAMPDIFF(YEAR, u.birth_date, CURDATE()) BETWEEN 55 AND 64 THEN 1 ELSE 0 END) / COUNT(v.id) * 100, 0) AS FLOAT)`,
                '55-64',
            )
            .addSelect(
                `CAST(IFNULL(SUM(CASE WHEN TIMESTAMPDIFF(YEAR, u.birth_date, CURDATE()) >= 65 THEN 1 ELSE 0 END) / COUNT(v.id) * 100, 0) AS FLOAT)`,
                '65+',
            )
            .addSelect(
                `CAST(IFNULL(SUM(CASE WHEN u.birth_date IS NULL THEN 1 ELSE 0 END) / COUNT(v.id) * 100, 0) AS FLOAT)`,
                'Unknown',
            )
            .from('votes', 'v')
            .innerJoin('options', 'options', 'v.option_id = options.id')
            .leftJoin('polls', 'p', 'v.poll_id = p.id')
            .leftJoin('users', 'u', 'v.user_id = u.id')
            .where('v.poll_id = :pollId', { pollId: 1 })
            .groupBy('options.id, options.text')
            .getRawMany();

        return res.json(results);
    }
}

export default new OptionController();
