import { ViewEntity, ViewColumn } from 'typeorm';

@ViewEntity({
    name: 'options_with_percentage',
    expression: `
    SELECT
      options.id,
      options.text,
      options.poll_id,
      options.created_at,
      options.updated_at,
      options.deleted_at, 
      CAST(100 * COUNT(votes.id) / SUM(COUNT(votes.id)) OVER() AS FLOAT) as percentage
    FROM options
    LEFT JOIN votes ON options.id = votes.option_id
    GROUP BY options.id;
  `,
})
export class OptionWithPercentage {
    @ViewColumn()
    id: number;

    @ViewColumn()
    text: string;

    @ViewColumn()
    poll_id: number;

    @ViewColumn()
    created_at: Date;

    @ViewColumn()
    updated_at: Date;

    @ViewColumn()
    deleted_at: Date;

    @ViewColumn()
    percentage: number;
}
