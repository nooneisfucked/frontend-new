import validator from 'validator';

export const parseFileContent = (text) => {
  const lines = text.split('\n');
  
  const subscribers = lines.map(line => {
    const [email, name] = line.split(',');
    return { 
      email: email?.trim(), 
      name: name?.trim() 
    };
  }).filter(sub => sub.email && validator.isEmail(sub.email));

  return subscribers;
};