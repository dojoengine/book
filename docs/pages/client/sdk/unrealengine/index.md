---
title: "Dojo Unreal Engine SDK"
description: "Introduction to the official Unreal Engine 5 SDK for building Dojo-powered games"
---

# dojo.unreal

## Overview

dojo.unreal is the official Unreal Engine 5 SDK for interacting with Dojo worlds to develop mobile and desktop 2D and 3D games.

## Prerequisites

Before getting started, you should ensure you have [Epic Games Launcher](https://www.unrealengine.com/en-US/download) installed to install Unreal Engine 5.

### Setting up dojo.unreal sdk

To get started with the dojo.unreal SDK, follow these steps:

::::steps

#### **Download dojo.unreal:**
Obtain the Dojo plugin by visiting [dojo.unreal](https://github.com/dojoengine/dojo.unreal). Either clone the repository or download it as a ZIP file to access the plugin.
    ![unrealdl](/unreal/downloadzip.png)

#### **Set Up Your Unreal Project:**
Launch Unreal Engine 5 and create a new project or open an existing one where you'll implement dojo.unreal.
    ![unrealcreate](/unreal/create_new_cpp_project.png)

#### **Import the Plugin:**

1. Navigate to your project directory by right-clicking the project in Epic Games Launcher (Unreal Engine > Library > My Projects)
![unrealdir](/unreal/open_project_directory.png)

2. Create a Plugins directory if one doesn't exist

3. Copy the Plugins/Dojo directory from dojo.unreal into your project's Plugins folder

4. Verify the plugin version in `Plugins/Dojo/Source/Dojo/Dojo.Build.cs`. For version updates or platform-specific deployments, refer to [Update the plugin](#update-the-plugin) or [Add a new platform](#add-a-new-platform) respectively.

5. Enable the Dojo plugin by adding `"Dojo"` to the `PublicDependencyModuleNames.AddRange` list in `Source/DojoBookTest/PROJECTNAME.Build.cs`

6. Generate bindings using `sozo build --unrealengine` and add the resulting `DojoHelpers.cpp` and `DojoHelpers.h` to `Source/PROJECTNAME`

7. Regenerate project files (see [Regenerate project files](#regenerate-project-files) for detailed instructions)

#### **Configure the Project:**

1. Open your project in Unreal Engine 5 to initiate the rebuild
![ue5rebuild](/unreal/rebuild.png)

2. Create a new blueprint
![unrealbp](/unreal/create_new_blueprint.png)

3. Initialize the DojoHelpers actor and store it as a variable
![unrealspawnactor](/unreal/create_dojo_helpers_actor.png)

4. Implement Torii connections and other desired functionality
![unrealusehelpers](/unreal/use_dojo_helpers.png)

5. Launch the game and verify the connection in the Output Log
![unrealtoriiconnected](/unreal/torii_connected.png)

## Regenerate project files

1. Delete the following directories if they exist:
   - Binaries/
   - Saved/
   - Intermediate/
   - DerivedDataCache/

2. Generate fresh project files based on your platform:

### Windows

- Right click on your project file `ProjectName.uproject`
- Select "Generate Visual Studio Project Files"
- Or run this from PowerShell:
  ```
  & 'C:\Program Files\Epic Games\UE_5.5\Engine\Binaries\DotNET\UnrealBuildTool\UnrealBuildTool.exe' -projectfiles -project="$PWD\ProjectName.uproject" -game -engine
  ```

### Mac

Open Terminal in your project directory and run:

```bash
# For UE 5.5
/Users/Shared/Epic\ Games/UE_5.5/Engine/Build/BatchFiles/Mac/GenerateProjectFiles.sh -project="$PWD/ProjectName.uproject" -game

# For other UE versions, adjust the path accordingly
```

### Linux

Run from project directory:
```bash
~/UnrealEngine/Engine/Build/BatchFiles/Linux/GenerateProjectFiles.sh -project="$PWD/ProjectName.uproject"
```

## Update the plugin

To update the plugin to a new version:

1. Build the dojo.c library for your platform
2. In your UE5 project directory, create a new directory next to Dojo.Build.cs named after your version number (e.g. "1.3.1")
3. Copy the dojo.h header file into this new version directory
4. Create a lib/`<platform>` subdirectory and copy the libdojo_c library file into it
5. Update the Dojo.Build.cs file to reference your new version number
6. Regenerate the project files following the instructions above


## Add a new platform

To add support for a new platform:

1. Build the dojo.c library for your target platform:
   - Use `cargo build --release --target <target>`
   - Common targets include:
      - iOS: `aarch64-apple-ios`
      - Android: `aarch64-linux-android`
      - Windows: `x86_64-pc-windows-msvc`
      - Mac: `aarch64-apple-darwin`

2. Create the platform-specific directory structure:
   - Navigate to your version folder (e.g. `1.3.1/`)
   - Create `lib/\<PLATFORM>` directory (e.g. `lib/iOS`, `lib/Android`)
   - Platform names should match Unreal's naming conventions

3. Copy the built library files:
   - Place the compiled library in the platform directory

4. Update Dojo.Build.cs:
   - Add platform-specific conditional logic if needed
   - Add library path definitions for your platform
   - Test compilation for the new platform
