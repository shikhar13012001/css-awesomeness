import { Avatar, AvatarsGroup } from '@mantine/core';
// get random avatar

const Demo = () => {
  const avatars = [
    'https://avatars.dicebear.com/api/bottts/ellena.svg',
    'https://avatars.dicebear.com/api/bottts/Kriti.svg',
    'https://avatars.dicebear.com/api/bottts/Subrat.svg',
    'https://avatars.dicebear.com/api/bottts/Aditya.svg',
    'https://avatars.dicebear.com/api/bottts/Yujiro.svg', 
  ];
  return (
    <AvatarsGroup limit={3} sx={{ display: 'flex', justifyContent: 'center' }}>
      {avatars.map((item, index) => (
        <Avatar src={item} component="a" key={index} />
      ))}
    </AvatarsGroup>
  );
};

export default Demo;
