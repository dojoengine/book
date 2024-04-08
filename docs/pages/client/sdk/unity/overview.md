# Dojo.unity

## Overview

Dojo.unity is the official Unity SDK for interacting with Dojo worlds to develop web and desktop 2D and 3D games.

## Prerequisites

Before getting started, you must follow a few steps to get the project up and running:
::::steps

### Install dependencies

- Install [Dojo](/toolchain/dojoup.md)

> Required version >= `0.4.0`

- Install [Unity](https://unity.com/download)

> Required version >= `2022.3.15f1`

### Setting up Dojo.unity sdk

To get started with the Dojo.Unity SDK, follow these steps:

- **Download the dojo.unity package:** Visit the [dojo.unity releases page](https://github.com/dojoengine/dojo.unity/releases) and download the latest version of the `dojo.unitypackage`.
- **Open or Create a Unity Project:** Launch Unity and either create a new project or open an existing one where you intend to integrate Dojo.unity
- **Import the Dojo.unity Package:** Navigate to `Assets/Import Package/Custom Package` within your Unity project.
  Choose the downloaded `dojo.unitypackage` file.
  ![unitypackage01](/unity/import-unitypackage-01.png)
  Finally, ensure to check only the aimed platforms for your project.
  ![unitypackage02](/unity/import-unitypackage-02.png)

> **Warning:** If your project includes the `Plugins/iOS` directory, note that it requires **Git Large File Storage (LFS)** to be uploaded. Refer to [GitHub's documentation on Git LFS](https://docs.github.com/en/repositories/working-with-files/managing-large-files/about-git-large-file-storage) for more information.

- **Import Newtonsoft's Json.NET Dependency:** In Unity, navigate to `Window/Package Manager`.
  ![unitypackage01](/unity/unitypackage-dependencies-01.png)
  Once the `Package Manager` window opens, select `Add package from git URL`
  ![unitypackage02](/unity/unitypackage-dependencies-02.png)
  Enter `com.unity.nuget.newtonsoft-json` as the package URL, click `Add` and then `Done` to import the dependency.
