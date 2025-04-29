
import React from 'react';
import { Card, CardContent, CardFooter } from '@/components/ui/card';

export interface TeamMemberProps {
  name: string;
  role: string;
  image: string;
  description: string;
}

const TeamMember: React.FC<TeamMemberProps> = ({
  name,
  role,
  image,
  description,
}) => {
  return (
    <Card className="overflow-hidden transition-all hover:shadow-md">
      <div className="aspect-square overflow-hidden">
        <img
          src={image}
          alt={name}
          className="h-full w-full object-cover transition-transform hover:scale-105"
        />
      </div>
      <CardContent className="pt-6">
        <h3 className="text-xl font-semibold">{name}</h3>
        <p className="text-sm text-primary mb-2">{role}</p>
        <p className="text-muted-foreground text-sm">{description}</p>
      </CardContent>
      <CardFooter className="border-t p-4">
        <div className="flex space-x-4">
          <a href="#" className="text-muted-foreground hover:text-primary">LinkedIn</a>
          <a href="#" className="text-muted-foreground hover:text-primary">Email</a>
        </div>
      </CardFooter>
    </Card>
  );
};

export default TeamMember;
