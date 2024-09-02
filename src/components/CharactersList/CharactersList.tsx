import useStore from "../../store/store";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

function CharactersList() {
  const characters = useStore((state) => state.user?.characters);
  return (
    <main className="ml-[17rem">
      <Card></Card>
      {characters ? (
        <ul>
          {characters.map((character) => {
            return (
              <a href={`characters/${character._id}`} key={character._id}>
                <Card>
                  <CardHeader>
                    <CardTitle>{character.name}</CardTitle>
                    <CardDescription>
                      Level {character.level} character
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <p>Card Content</p>
                  </CardContent>
                  <CardFooter></CardFooter>
                </Card>
              </a>
            );
          })}
        </ul>
      ) : (
        <p>No characters created.</p>
      )}
    </main>
  );
}

export default CharactersList;
