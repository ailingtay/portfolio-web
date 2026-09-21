/* Independent copy for featured-story-review.html. Edit text, captions and assets here.
   This file does not change the original portfolio. See FEATURED-STORY-REVIEW.md. */
window.FEATURED_STORY = {
  "title": "The AI Timer Lab",
  "kicker": "45 classroom timers. One production challenge.",
  "summary": "Countdown timers from 30 seconds to 60 minutes, designed for classroom activities and transitions. I used the project to explore where AI could reduce repetitive production work while I kept control of the visual design and finish.",
  "category": "Featured project / 2026",
  "metadata": [
    {
      "label": "My role",
      "value": "Concept, visual design, motion design, AI experimentation and production"
    },
    {
      "label": "Designed for",
      "value": "Teachers · classroom activities and transitions"
    },
    {
      "label": "Scope",
      "value": "45 timers · 30 seconds to 60 minutes"
    }
  ],
  "sections": [
    {
      "id": "context",
      "label": "01 / The challenge",
      "title": "45 timers, one system",
      "body": "Compositions, countdown logic, assets, animation and exports: the same production stages repeated across the set.\n\nI broke the work into stages and tested where AI could reduce repetition, while keeping the design decisions editable.",
      "workflow": {
        "title": "Production workflow",
        "footer": "AI tested here",
        "testedCount": 4,
        "items": [
          {
            "label": "01 Ideation",
            "src": "assets/timer-lab/01-workflow-ideation.png",
            "alt": "Ideation lightbulb illustration"
          },
          {
            "label": "02 Assets",
            "src": "assets/timer-lab/01-workflow-assets.png",
            "alt": "Stack of visual assets illustration"
          },
          {
            "label": "03 Animation",
            "src": "assets/timer-lab/01-workflow-animation.png",
            "alt": "Animation film frame illustration"
          },
          {
            "label": "04 Audio",
            "src": "assets/timer-lab/01-workflow-audio.png",
            "alt": "Audio music notes illustration"
          },
          {
            "label": "05 Export",
            "src": "assets/timer-lab/01-workflow-export.png",
            "alt": "Export upload illustration"
          }
        ]
      },
      "caption": "I tested AI across ideation, assets, animation and audio, then brought the work together for export."
    },
    {
      "id": "test-one",
      "label": "02 / Test one",
      "title": "A working prototype revealed the trade-off",
      "body": "I started with the countdown itself. Using Claude, I built a browser-based tool that could generate and export a 16:9 timer in a few clicks.\n\nThe prototype worked, but it limited how much I could customise the typography, animation and overall finish.\n\n**Automating the entire workflow wasn’t the goal.** I needed a faster way to set up the work inside the design process I already used.",
      "inlineMedia": {
        "afterParagraph": 1,
        "fullWidth": true,
        "media": {
          "type": "video",
          "src": "assets/timer-lab-review/02-timer-app.mp4",
          "alt": "Claude timer generator app interface",
          "label": "Timer generator app",
          "aspectRatio": "960 / 703",
          "caption": "Browser prototype: generating a countdown quickly, with limited control over the final visual treatment.",
          "poster": "assets/timer-lab-review/02-timer-app.jpg",
          "playback": "manual"
        }
      },
      "mediaGroups": [
        {
          "layout": "pair",
          "items": [
            {
              "type": "image",
              "src": "assets/timer-lab/02-compare1.png",
              "alt": "Timer without After Effects",
              "label": "Timer without After Effects",
              "caption": "Browser prototype — a functional countdown with a simple visual treatment.",
              "aspectRatio": "16 / 9"
            },
            {
              "type": "image",
              "src": "assets/timer-lab/02-compare2.png",
              "alt": "Timer with After Effects",
              "label": "Timer with After Effects",
              "caption": "After Effects example — a designed scene with custom typography and finishing.",
              "aspectRatio": "16 / 9"
            }
          ]
        }
      ]
    },
    {
      "id": "test-two",
      "label": "03 / Test two",
      "title": "Automating setup, keeping design editable",
      "body": "I built a tool that created the basic timer structure inside After Effects.\n\nThis reduced the repetitive setup while leaving typography, colour, animation and effects editable. I could spend more of the process shaping each timer’s visual treatment.",
      "inlineMedia": {
        "afterParagraph": 1,
        "fullWidth": true,
        "media": {
          "type": "video",
          "src": "assets/timer-lab-review/03-ae-plugin.mp4",
          "alt": "After Effects timer setup plugin",
          "label": "After Effects plugin in action",
          "aspectRatio": "960 / 586",
          "caption": "The After Effects tool creates the timer structure; the design and animation remain editable.",
          "poster": "assets/timer-lab-review/03-ae-plugin.jpg",
          "playback": "manual"
        }
      }
    },
    {
      "id": "directing-motion",
      "label": "04 / Directing AI motion",
      "title": "From my illustration to a moving timer",
      "body": "For illustrated timers, I created the artwork first, then used AI to explore movement.\n\nThe visual direction started with my design. I reviewed the generated motion and brought it into the final timer.",
      "inlineMedia": {
        "afterParagraph": 2,
        "fullWidth": true,
        "workflow": {
          "items": [
            {
              "label": "Illustration",
              "src": "assets/timer-lab/04-drawing.png",
              "alt": "Illustration for the timer scene"
            },
            {
              "label": "AI motion",
              "src": "assets/timer-lab-review/04-movement.mp4",
              "alt": "AI motion exploration",
              "type": "video",
              "poster": "assets/timer-lab-review/04-movement.jpg",
              "playback": "preview"
            },
            {
              "label": "Final timer",
              "src": "assets/timer-lab-review/04-final-timer.mp4",
              "alt": "Final timer result",
              "type": "video",
              "poster": "assets/timer-lab-review/04-final-timer.jpg",
              "playback": "preview"
            }
          ]
        }
      },
      "caption": "Original illustration → AI-assisted movement → final timer assembled in After Effects."
    },
    {
      "id": "getting-movement-right",
      "label": "05 / Getting the movement right",
      "title": "Choosing movement that served the timer",
      "body": "For a classroom timer, movement needed to feel alive without becoming distracting. I reviewed each generation against the reference, adjusted the prompt and rejected outputs that changed the composition or introduced unwanted details.",
      "comparison": {
        "items": [
          {
            "title": "Starting reference",
            "media": {
              "type": "image",
              "src": "assets/timer-lab/05-owl reference.png",
              "alt": "Owl reference image",
              "label": "Reference image",
              "aspectRatio": "3381 / 1902"
            },
            "notes": [
              {
                "label": "Intention",
                "text": "Keep the owl, book stack and framing consistent while introducing movement."
              }
            ]
          },
          {
            "title": "Rejected: changed background",
            "media": {
              "type": "video",
              "src": "assets/timer-lab-review/05-owl-bad-1.mp4",
              "alt": "Failed owl generation with an unwanted forest background",
              "label": "Failed generation 01",
              "aspectRatio": "800 / 457",
              "playback": "preview",
              "poster": "assets/timer-lab-review/05-owl-bad-1.jpg"
            },
            "notes": [
              {
                "label": "What changed",
                "text": "The model added a forest background and changed the framing."
              },
              {
                "label": "Next adjustment",
                "text": "Constrain the background, framing and camera movement."
              }
            ]
          },
          {
            "title": "Rejected: unstable movement",
            "media": {
              "type": "video",
              "src": "assets/timer-lab-review/05-owl-bad-2.mp4",
              "alt": "Failed owl generation with extra books and unstable movement",
              "label": "Failed generation 02",
              "aspectRatio": "800 / 457",
              "playback": "preview",
              "poster": "assets/timer-lab-review/05-owl-bad-2.jpg"
            },
            "notes": [
              {
                "label": "What changed",
                "text": "Extra books appeared and the movement became unstable."
              },
              {
                "label": "Next adjustment",
                "text": "Keep object placement consistent and reduce the movement."
              }
            ]
          },
          {
            "title": "Selected: controlled movement",
            "media": {
              "type": "video",
              "src": "assets/timer-lab-review/05-owl-approved.mp4",
              "alt": "Approved owl generation controlled enough for the final timer",
              "label": "Approved generation",
              "aspectRatio": "800 / 457",
              "playback": "preview",
              "poster": "assets/timer-lab-review/05-owl-approved.jpg"
            },
            "notes": [
              {
                "label": "Why I kept it",
                "text": "The composition stayed close to the reference and the movement was subtle enough for the timer."
              }
            ]
          }
        ]
      },
      "mediaGroups": [
        {
          "layout": "stack",
          "items": [
            {
              "type": "video",
              "src": "assets/timer-lab-review/05-final.mp4",
              "alt": "Final AI motion result",
              "label": "Final result",
              "caption": "Library timer — the selected motion integrated into the finished scene.",
              "aspectRatio": "16 / 9",
              "playback": "preview",
              "poster": "assets/timer-lab-review/05-final.jpg"
            }
          ]
        }
      ],
      "detailMedia": {
        "summary": "Explore the node workflow",
        "media": {
          "type": "video",
          "src": "assets/timer-lab-review/05-node.mp4",
          "alt": "Node-based generation workflow",
          "label": "Node workflow",
          "caption": "The node workflow organised separate scene elements and their motion tests before final assembly.",
          "aspectRatio": "960 / 753",
          "playback": "manual",
          "poster": "assets/timer-lab-review/05-node.jpg"
        }
      }
    },
    {
      "id": "longer-timers",
      "label": "06 / The five-second problem",
      "title": "Building a longer timer from short loops",
      "body": "The tools I tested produced short clips, while some timers needed to run for several minutes.\n\nFor the robot timer, I combined a repeating sleeping loop with dream doodles, small twitches and a final wake-up. This let me control the pacing without generating the whole duration.",
      "timeline": {
        "media": {
          "type": "video",
          "src": "assets/timer-lab-review/06-robot-timer.mp4",
          "alt": "Robot timer loop with a fully charged in title card",
          "label": "Robot timer loop",
          "aspectRatio": "16 / 9",
          "playback": "preview",
          "caption": "Robot timer excerpt — a sleeping character, occasional events and a final wake-up.",
          "poster": "assets/timer-lab-review/06-robot-timer.jpg"
        },
        "legend": [
          {
            "label": "Base sleeping loop",
            "kind": "loop"
          },
          {
            "label": "Ambient events",
            "kind": "dream"
          },
          {
            "label": "Smaller character events",
            "kind": "twitch"
          },
          {
            "label": "Larger character events",
            "kind": "wake"
          }
        ],
        "ticks": [
          {
            "label": "00:00",
            "position": 0
          },
          {
            "label": "04:00",
            "position": 19.4
          },
          {
            "label": "08:00",
            "position": 39
          },
          {
            "label": "12:00",
            "position": 59.5
          },
          {
            "label": "16:00",
            "position": 81.2
          },
          {
            "label": "End",
            "position": 100
          }
        ],
        "events": [
          {
            "label": "Dream doodles A",
            "position": 17,
            "kind": "dream"
          },
          {
            "label": "Twitch A",
            "position": 28,
            "kind": "twitch"
          },
          {
            "label": "Dream doodles B",
            "position": 39,
            "kind": "dream"
          },
          {
            "label": "Twitch B",
            "position": 45,
            "kind": "twitch"
          },
          {
            "label": "Dream doodles C",
            "position": 63,
            "kind": "dream"
          },
          {
            "label": "Twitch C",
            "position": 75,
            "kind": "twitch"
          },
          {
            "label": "Dream doodles D",
            "position": 85,
            "kind": "dream"
          },
          {
            "label": "Twitch D",
            "position": 96.7,
            "kind": "twitch"
          },
          {
            "label": "Wake up",
            "position": 100,
            "kind": "wake"
          }
        ]
      },
      "caption": "The sequence uses a base loop, small events and a final wake-up. The timestamps show elapsed time through the sequence."
    },
    {
      "id": "different-tools",
      "label": "07 / Different tools, different jobs",
      "title": "Choosing the approach for each design",
      "body": "Different visual ideas called for different production methods. These four examples show how I combined asset creation, animation, music and assembly.",
      "toolSystems": {
        "items": [
          {
            "title": "Timer A",
            "media": {
              "type": "image",
              "src": "assets/timer-lab/07-timer-a.png",
              "alt": "Timer A with a yellow illustrated character and colourful rays",
              "label": "Timer A",
              "aspectRatio": "16 / 9"
            },
            "steps": [
              {
                "label": "Assets",
                "sublabel": "Procreate",
                "tools": [
                  {
                    "name": "Procreate",
                    "src": "assets/timer-lab/07-procreate.png"
                  }
                ]
              },
              {
                "label": "AI motion",
                "sublabel": "MiniMax H3 via RunwayML",
                "tools": [
                  {
                    "name": "MiniMax H3",
                    "src": "assets/timer-lab/07-minimax.png"
                  }
                ]
              },
              {
                "label": "AI music",
                "sublabel": "ElevenLabs",
                "tools": [
                  {
                    "name": "ElevenLabs",
                    "src": "assets/timer-lab/07-elevenlabs.png"
                  }
                ]
              },
              {
                "label": "Assembly",
                "sublabel": "After Effects",
                "tools": [
                  {
                    "name": "After Effects",
                    "src": "assets/timer-lab/07-after-effects-icon.png"
                  }
                ]
              }
            ],
            "description": "Original illustration set the style; AI added movement before assembly in After Effects."
          },
          {
            "title": "Timer B",
            "media": {
              "type": "image",
              "src": "assets/timer-lab/07-timer-b.png",
              "alt": "Timer B with illustrated weather characters",
              "label": "Timer B",
              "aspectRatio": "16 / 9"
            },
            "steps": [
              {
                "label": "Assets",
                "sublabel": "Photoshop + Illustrator",
                "tools": [
                  {
                    "name": "Photoshop",
                    "src": "assets/timer-lab/07-photoshop.png"
                  },
                  {
                    "name": "Illustrator",
                    "src": "assets/timer-lab/07-illustrator.png"
                  }
                ]
              },
              {
                "label": "AI animation",
                "sublabel": "Claude",
                "tools": [
                  {
                    "name": "Claude",
                    "src": "assets/timer-lab/07-claude.png"
                  }
                ]
              },
              {
                "label": "AI music",
                "sublabel": "ElevenLabs",
                "tools": [
                  {
                    "name": "ElevenLabs",
                    "src": "assets/timer-lab/07-elevenlabs.png"
                  }
                ]
              },
              {
                "label": "Assembly",
                "sublabel": "After Effects",
                "tools": [
                  {
                    "name": "After Effects",
                    "src": "assets/timer-lab/07-after-effects-icon.png"
                  }
                ]
              }
            ],
            "description": "Illustrated weather assets were combined with AI-assisted animation and finishing in After Effects."
          },
          {
            "title": "Timer C",
            "media": {
              "type": "image",
              "src": "assets/timer-lab/07-timer-c.png",
              "alt": "Timer C with an owl and hourglass in a library",
              "label": "Timer C",
              "aspectRatio": "16 / 9"
            },
            "steps": [
              {
                "label": "Assets",
                "sublabel": "ChatGPT + Gemini Flow",
                "tools": [
                  {
                    "name": "ChatGPT",
                    "src": "assets/timer-lab/07-chatGPT.png"
                  },
                  {
                    "name": "Gemini",
                    "src": "assets/timer-lab/07-gemini.png"
                  }
                ]
              },
              {
                "label": "AI animation + motion",
                "sublabel": "Claude + MiniMax H3 via ElevenLabs",
                "tools": [
                  {
                    "name": "Claude",
                    "src": "assets/timer-lab/07-claude.png"
                  },
                  {
                    "name": "MiniMax H3",
                    "src": "assets/timer-lab/07-minimax.png"
                  }
                ]
              },
              {
                "label": "AI music",
                "sublabel": "ElevenLabs",
                "tools": [
                  {
                    "name": "ElevenLabs",
                    "src": "assets/timer-lab/07-elevenlabs.png"
                  }
                ]
              },
              {
                "label": "Assembly",
                "sublabel": "After Effects",
                "tools": [
                  {
                    "name": "After Effects",
                    "src": "assets/timer-lab/07-after-effects-icon.png"
                  }
                ]
              }
            ],
            "description": "Generated imagery and motion were combined into a library scene, then assembled in After Effects."
          },
          {
            "title": "Timer D",
            "media": {
              "type": "image",
              "src": "assets/timer-lab/07-timer-e.png",
              "alt": "Timer D with colourful Time’s up lettering",
              "label": "Timer D",
              "aspectRatio": "16 / 9"
            },
            "steps": [
              {
                "label": "Assets",
                "sublabel": "Illustrator",
                "tools": [
                  {
                    "name": "Illustrator",
                    "src": "assets/timer-lab/07-illustrator.png"
                  }
                ]
              },
              {
                "label": "Animation",
                "sublabel": "After Effects",
                "tools": [
                  {
                    "name": "After Effects",
                    "src": "assets/timer-lab/07-after-effects-icon.png"
                  }
                ]
              },
              {
                "label": "AI music",
                "sublabel": "ElevenLabs",
                "tools": [
                  {
                    "name": "ElevenLabs",
                    "src": "assets/timer-lab/07-elevenlabs.png"
                  }
                ]
              },
              {
                "label": "Assembly",
                "sublabel": "After Effects",
                "tools": [
                  {
                    "name": "After Effects",
                    "src": "assets/timer-lab/07-after-effects-icon.png"
                  }
                ]
              }
            ],
            "description": "Typography was created in Illustrator and animated in After Effects, with AI-generated music."
          }
        ]
      }
    },
    {
      "id": "final-system",
      "label": "08 / Selected results",
      "title": "One production system, different visual worlds",
      "body": "The workflow brought together reusable timer setup, original artwork, generated motion, loops and manual animation.\n\nThese excerpts show the range of visual treatments. The repeated structure supported production while leaving room to design each timer differently.",
      "mediaGroups": [
        {
          "layout": "results",
          "items": [
            {
              "type": "video",
              "src": "assets/timer-lab-review/04-final-timer.mp4",
              "alt": "Illustrated yellow character timer",
              "label": "Illustrated timer",
              "caption": "Illustrated timer — original character artwork with AI-assisted movement.",
              "poster": "assets/timer-lab-review/04-final-timer.jpg",
              "playback": "preview"
            },
            {
              "type": "video",
              "src": "assets/timer-lab-review/05-final.mp4",
              "alt": "Owl and hourglass library timer",
              "label": "Library timer",
              "caption": "Library timer — generated scene elements, selected motion and compositing.",
              "poster": "assets/timer-lab-review/05-final.jpg",
              "playback": "preview"
            },
            {
              "type": "video",
              "src": "assets/timer-lab-review/06-robot-timer.mp4",
              "alt": "Robot classroom timer",
              "label": "Robot timer",
              "caption": "Robot timer — repeating motion with small events and a closing action.",
              "poster": "assets/timer-lab-review/06-robot-timer.jpg",
              "playback": "preview"
            }
          ]
        }
      ]
    },
    {
      "id": "reflection",
      "label": "09 / What I took from it",
      "title": "Knowing what to hand over",
      "body": "The biggest shift was realising I didn’t need to automate everything. The useful part was knowing when to hand something over, when to experiment, and when it was better to make it myself.\n\nFor future projects, I would start with the repetitive setup, test generated motion against a clear visual direction, and keep the final design decisions editable.",
      "media": []
    }
  ],
  "overview": [
    {
      "title": "Reusable setup",
      "body": "A custom tool inside After Effects to create the timer structure."
    },
    {
      "title": "Directed motion",
      "body": "Original artwork, generated movement and hands-on finishing."
    },
    {
      "title": "Longer sequences",
      "body": "Short loops and small events arranged into longer timers."
    }
  ],
  "showcase": [
    {
      "src": "assets/timer-lab/07-timer-a.png",
      "alt": "Yellow illustrated character over colourful rays with a countdown",
      "caption": "Illustration and AI-assisted motion"
    },
    {
      "src": "assets/timer-lab/07-timer-b.png",
      "alt": "A countdown surrounded by illustrated weather characters",
      "caption": "Weather characters and animation"
    },
    {
      "src": "assets/timer-lab/07-timer-c.png",
      "alt": "An owl beside a countdown hourglass in a candlelit library",
      "caption": "Generated scenes and compositing"
    },
    {
      "src": "assets/timer-lab/07-timer-e.png",
      "alt": "Colourful geometric letters spelling Time’s up",
      "caption": "Typography and motion design"
    }
  ]
};
