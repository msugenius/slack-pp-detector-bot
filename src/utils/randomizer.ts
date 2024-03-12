export function randomElement (arr: string[]): string {
	const index = Math.floor(Math.random() * arr.length);
	return arr[index];
}