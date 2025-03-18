---
title: Saya and Herodotus
description: Configure your Herodotus account to work with Saya.
---

# Herodotus - The proving provider

In order to prove blocks, Saya is currently relying on the Herodotus service. This service can handle trace generation and proof generation, by proxying the proof generations to [SHARP](https://docs.starknet.io/architecture-and-concepts/provers-overview/).


## Create an account

You will need to create an account on the [Herodotus portal](https://herodotus.cloud) and provide the account API key in the `ATLANTIC_KEY` environment variable.

::::info
If you are testing Saya for a Dojo project, please contact us in the [Dojo Discord](https://discord.gg/dojoengine) to get some credits in the Dojo Playground Project.
::::
