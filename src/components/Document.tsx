interface Props {
  description: string;
  cost: number;
}

export const Document = ({ description, cost }: Props) => (
  <>
    <div>Description: {description}</div>
    <div>Cost: ${cost}</div>
  </>
);
