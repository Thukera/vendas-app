
type MessageProps = {
  texto: string;
  field?: string;
  tipo: string;
};

export interface Alert {
  texto: string;
  field?: string;
  tipo: string;
}

export const Message: React.FC<MessageProps> = ({ texto, field, tipo }) => {
  return (
    <article className={`message is-${tipo}`}>
      <div className="message-body">
        {field && `${field}: `}{texto}
      </div>
    </article>
  );
};
