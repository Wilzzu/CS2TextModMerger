![Banner](https://i.imgur.com/Lsh8BCq.png)

<h1 align="center">CS2 Text Mod Merger</h1>

<p align="center">Electron app made for merging Counter-Strike 2 text mod files with the game's original language files.</p>

## About

> [!WARNING]
> This tool is now deprecated, as Valve moved the language files to the .vpk archives on December 14, 2023.

CS2TextModMerger was created to help merging modded text files with Counter-Strike 2's original language files. This allows you to use your custom strings with any of the game's language files, not just the English one. You will need to run this app every time the game's language files are updated, as the modded text files will be overwritten. Thankfully this process is quick and easy!

## Usage

1. Download the latest release from the [Releases](https://github.com/Wilzzu/CS2TextModMerger/releases/latest) page.
2. Extract the contents of the zip file.
3. Run the `CS2TextModMerger.exe` file.
4. Select the language file you want to customize, found in the `Counter-Strike Global Offensive\game\csgo\resource` folder.
5. Select the modded text file you want to merge with the language file. Refer to the [Example Text Mod File](#example-text-mod-file) for the format.
6. Click the `MERGE FILES` button.
7. The original language file should now be updated with the modded text file's strings. You can close the app and start the game.

## Building from Source

1. Clone the repository:

   ```
   git clone https://github.com/Wilzzu/CS2TextModMerger.git
   cd CS2TextModMerger
   ```

2. Install the dependencies:

   ```
   npm install
   ```

3. Build the app:

   ```
   npm run package
   ```

4. The built app will be located in the `release` folder.

## Example Text Mod File

```txt
// UI
	"match_ready_accept"								"ACCEPT MATCH"
    "SFUI_Lobby_MatchReadyButton"						"ACCEPT MATCH"
	"WinPanel_RoundWon"									"ROUND WON"
	"WinPanel_RoundLost"								"ROUND LOST"

// Alerts
    "Cstrike_TitlesTXT_Bomb_Defused"                    "Bomb defused"
    "Cstrike_TitlesTXT_Bomb_Planted"                    "Bomb planted, %s1 seconds left"

// Chat messages
    "Game_radio"                                        "%s1: %s2"
    "Game_radio_location"                               "%s1 [%s2]: %s3"
    "Cstrike_Chat_CT_Loc"                               "(TEAM) %s1 [%s3]: %s2"
    "Cstrike_Chat_T_Loc"                                "(TEAM) %s1 [%s3]: %s2"
    "Cstrike_Chat_CT_Dead"                              "[DEAD] (TEAM) %s1: %s2"
    "Cstrike_Chat_T_Dead"                               "[DEAD] (TEAM) %s1: %s2"
    "Cstrike_Chat_CT"                                   "(TEAM) %s1: %s2"
    "Cstrike_Chat_T"                                    "(TEAM) %s1: %s2"
    "Cstrike_Chat_All"                                  "%s1: %s2"
    "Cstrike_Chat_AllDead"                              "[DEAD] %s1: %s2"

// Grenade radio
    "SFUI_TitlesTXT_Fire_in_the_hole"                   "• Grenade"
    "SFUI_TitlesTXT_Molotov_in_the_hole"                "• Molotov"
    "SFUI_TitlesTXT_Incendiary_in_the_hole"             "• Incendiary"
    "SFUI_TitlesTXT_Flashbang_in_the_hole"              "• Flash"
    "SFUI_TitlesTXT_Smoke_in_the_hole"                  "• Smoke"
    "SFUI_TitlesTXT_Decoy_in_the_hole"                  "• Decoy"

```

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.
