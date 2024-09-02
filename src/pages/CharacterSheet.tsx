import { useEffect } from "react";
import { useParams } from "react-router-dom";
import useStore, { Character } from "../store/store";
import * as characterService from "@/services/characterService";
import { number, string, z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "../components/ui/button";
import {
  Form,
  FormField,
  FormControl,
  FormDescription,
  FormItem,
  FormLabel,
  FormMessage,
} from "../components/ui/form";
import { Input } from "../components/ui/input";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

const characterSchema = z.object({
  name: z.string(),
  race: z.string(),
  sex: z.string(),
  size: z.string(),
  age: z.coerce.number(),
  height: z.string(),
  weight: z.coerce.number(),
  alignment: z.string(),
  languages: z.string().array(),
  initiative: z.coerce.number(),
  speed: z.coerce.number(),
  maxHP: z.coerce.number(),
  currentHP: z.coerce.number(),
  tempHP: z.coerce.number(),
  hitDiceRemaining: z.coerce.number(),
  hitDiceType: string(),
  hitDiceTotal: z.coerce.number(),
});

function CharacterSheet() {
  const { characterId } = useParams();
  const currentCharacter = useStore((state) => state.currentCharacter);
  const user = useStore((state) => state.user);
  const updateCharacter = useStore((state) => state.updateCharacter);
  const abilityScores = [
    {
      name: "Str",
      abilityScore: currentCharacter.strength,
      abilityMod: calculateAbilityMod(currentCharacter.strength),
    },
    {
      name: "Dex",
      abilityScore: currentCharacter.dexterity,
      abilityMod: calculateAbilityMod(currentCharacter.dexterity),
    },
    {
      name: "Con",
      abilityScore: currentCharacter.constitution,
      abilityMod: calculateAbilityMod(currentCharacter.constitution),
    },
    {
      name: "Cha",
      abilityScore: currentCharacter.charisma,
      abilityMod: calculateAbilityMod(currentCharacter.charisma),
    },
    {
      name: "Wis",
      abilityScore: currentCharacter.wisdom,
      abilityMod: calculateAbilityMod(currentCharacter.wisdom),
    },
    {
      name: "Int",
      abilityScore: currentCharacter.intelligence,
      abilityMod: calculateAbilityMod(currentCharacter.intelligence),
    },
  ];

  function calculateAbilityMod(abilityScore: number): number {
    return Math.floor((abilityScore - 10) / 2);
  }

  if (!characterId) {
    throw new Error("No character currently selected.");
  }

  useEffect(() => {
    const fetchCharacter = async () => {
      const fetchedCharacter: Character =
        await characterService.getCharacter(characterId);
      if (fetchedCharacter) {
        updateCharacter(fetchedCharacter);
      }
    };
    fetchCharacter();
  }, []);

  const form = useForm<z.infer<typeof characterSchema>>({
    resolver: zodResolver(characterSchema),
    defaultValues: {
      name: "",
      race: "",
      sex: "",
      size: "",
      age: 0,
      height: "",
      weight: 0,
      alignment: "",
      languages: [],
      initiative: 0,
      speed: 0,
      maxHP: 0,
      currentHP: 0,
      tempHP: 0,
      hitDiceRemaining: 0,
      hitDiceType: "",
      hitDiceTotal: 0,
    },
    values: {
      name: currentCharacter.name,
      race: currentCharacter.race,
      sex: currentCharacter.sex,
      size: currentCharacter.size,
      age: currentCharacter.age,
      height: currentCharacter.height,
      weight: currentCharacter.weight,
      alignment: currentCharacter.alignment,
      languages: currentCharacter.languages,
      initiative: currentCharacter.initiative,
      speed: currentCharacter.speed,
      maxHP: currentCharacter.maxHP,
      currentHP: currentCharacter.currentHP,
      tempHP: currentCharacter.tempHP,
      hitDiceRemaining: currentCharacter.hitDiceRemaining,
      hitDiceType: currentCharacter.hitDiceType,
      hitDiceTotal: currentCharacter.hitDiceTotal,
    },
  });

  async function saveCharacter(
    values: z.infer<typeof characterSchema>,
    e: any,
  ) {
    e.preventDefault();
    try {
      characterService.saveCharacter({
        ...values,
        _id: characterId,
      });
    } catch (err: unknown) {
      console.log(err);
    }
  }

  return (
    <main className="ml-[17rem]">
      <h1>Current Character</h1>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(saveCharacter)}>
          <Card>
            <CardHeader>
              <CardTitle>Basic Details</CardTitle>
              <CardDescription></CardDescription>
            </CardHeader>
            <CardContent className="grid grid-cols-3">
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Name</FormLabel>
                    <FormControl>
                      <Input placeholder="Name" {...field} />
                    </FormControl>
                    <FormDescription></FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="race"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Race</FormLabel>
                    <FormControl>
                      <Input placeholder="Race" {...field} />
                    </FormControl>
                    <FormDescription></FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="sex"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Sex</FormLabel>
                    <FormControl>
                      <Input placeholder="Sex" {...field} />
                    </FormControl>
                    <FormDescription></FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="size"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Size</FormLabel>
                    <FormControl>
                      <Input placeholder="Size" {...field} />
                    </FormControl>
                    <FormDescription></FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="age"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Age</FormLabel>
                    <FormControl>
                      <Input placeholder="Age" type="number" {...field} />
                    </FormControl>
                    <FormDescription></FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="height"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Height</FormLabel>
                    <FormControl>
                      <Input placeholder="Height" {...field} />
                    </FormControl>
                    <FormDescription></FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="weight"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Weight</FormLabel>
                    <FormControl>
                      <Input placeholder="Weight" type="number" {...field} />
                    </FormControl>
                    <FormDescription></FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="alignment"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Alignment</FormLabel>
                    <FormControl>
                      <Input placeholder="Alignment" {...field} />
                    </FormControl>
                    <FormDescription></FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Abilities</CardTitle>
              <CardDescription>Ability Scores and Modifiers</CardDescription>
            </CardHeader>
            <CardContent className="grid grid-cols-2 gap-2">
              {abilityScores.map((ability) => {
                return (
                  <div className="flex flex-col text-center rounded-md border-[1px] border-slate-300">
                    <h2>{ability.name}</h2>
                    <h3>
                      {ability.abilityMod > 0
                        ? `+${ability.abilityMod}`
                        : ability.abilityMod}
                    </h3>
                    <h4 className="rounded-md border-[1px] border-slate-200">
                      {ability.abilityScore}
                    </h4>
                  </div>
                );
              })}
            </CardContent>
            <CardFooter></CardFooter>
          </Card>
          <FormField
            control={form.control}
            name="languages"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Languages</FormLabel>
                <FormControl>
                  <Input placeholder="Languages" {...field} />
                </FormControl>
                <FormDescription></FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="initiative"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Initiative</FormLabel>
                <FormControl>
                  <Input placeholder="Initiative" type="number" {...field} />
                </FormControl>
                <FormDescription></FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="speed"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Speed</FormLabel>
                <FormControl>
                  <Input placeholder="Speed" type="number" {...field} />
                </FormControl>
                <FormDescription></FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="maxHP"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Max HP</FormLabel>
                <FormControl>
                  <Input placeholder="Max HP" type="number" {...field} />
                </FormControl>
                <FormDescription></FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="currentHP"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Current HP</FormLabel>
                <FormControl>
                  <Input placeholder="Current HP" type="number" {...field} />
                </FormControl>
                <FormDescription></FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="tempHP"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Temp HP</FormLabel>
                <FormControl>
                  <Input placeholder="Temp HP" type="number" {...field} />
                </FormControl>
                <FormDescription></FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="hitDiceRemaining"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Remaining Hit Die</FormLabel>
                <FormControl>
                  <Input
                    placeholder="Remaining Hit Die"
                    type="number"
                    {...field}
                  />
                </FormControl>
                <FormDescription></FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="hitDiceType"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Hit Dice Type</FormLabel>
                <FormControl>
                  <Input placeholder="Hit Dice Type" {...field} />
                </FormControl>
                <FormDescription></FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="hitDiceTotal"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Max # of Hit Die</FormLabel>
                <FormControl>
                  <Input placeholder="Total Hit Die" type="number" {...field} />
                </FormControl>
                <FormDescription></FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
          <Button type="submit">Save Character</Button>
        </form>
      </Form>
    </main>
  );
}

export default CharacterSheet;
