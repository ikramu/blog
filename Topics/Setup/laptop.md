# Strajk's setup

## Current HW Setup
``` text
MacBook Pro, 17-inch, Early 2011
Processor: Intel Core i7 CPU 2720QM, Sandy Bridge, 2.2 GHz, 4 cores
Memory: 16 GB 1333 MHz DDR3
Graphics: Intel HD Graphics 3000 512 MB
Graphics: AMD Radeon HD 6750M 1024 MB
Manufactured during: March 2011
Serial Number: C****3
```

## Dropbox selective sync
``` text
 # Home folder dotfiles
~/.gemrc            -> ~/Dropbox/Sync/.gemrc
~/.gitconfig        -> ~/Dropbox/Sync/.gitconfig
~/.gitignore_global -> ~/Dropbox/Sync/.gitignore_global
~/.js               -> ~/Dropbox/Sync/.js
~/.oh-my-zsh/custom -> ~/Dropbox/Sync/zsh-custom
~/.ssh              -> ~/Dropbox/Sync/.ssh
~/.zshrc            -> ~/Dropbox/Sync/.zshrc
 # Library folders
~/Desktop           -> ~/Dropbox/Desktop
~/Documents         -> ~/Dropbox/Documents
~/Pictures          -> ~/Dropbox/Pictures
```

## Backup

#### Local: TimeMachine

#### Cloud: Backbaze

## Boot USB

1. Prepare 8GB USB stick
2. Download OS X from AppStore
3. Use http://liondiskmaker.com to prepare bootable USB


## Setup OS X

## 1. Core tools & apps that most other apps depends on

#### Homebrew & brew-cask

copy-paste this command from http://brew.sh/
``` bash
ruby -e "$(curl -fsSL https://raw.github.com/mxcl/homebrew/go)"
brew doctor
```

copy-paste this command from https://github.com/phinze/homebrew-cask
```
brew tap phinze/homebrew-cask && brew install brew-cask
```

## 2. Dropbox (needed for syncing of succeeding apps)
``` bash
brew cask install dropbox
```
**!!! Wait for Dropbox to completely sync before next steps !!!**

## 3. Sync Home folder
Dotfiles
``` bash
ln -s ~/Dropbox/Sync/home/.* $HOME
```

_Sync `.zshrc` is covered later, after installing `oh-my-zsh`_

Repair `.ssh` permissions
``` bash
sudo chmod 0600 ~/.ssh/*
sudo chmod 0644 ~/.ssh/*.pub
```

Link user library folders
```
for dir in Desktop Documents Pictures Movies Music Public
do
	echo "$HOME/$dir: processing"
	if test -L ~/$dir; then # symbolic link
		echo "$HOME/$dir: already symbolic link"
	else
		if test -d $HOME/$dir; then # directory
			echo "$HOME/$dir: already exist, backup"
		    sudo mv $HOME/$dir $HOME/$dir.REMOVE
		fi
		echo "$HOME/$dir: linking"
		ln -s $HOME/Dropbox/$dir $HOME
	fi
done
```

## 4. OS X Preferences

``` bash
 # Use column view in all Finder windows by default
defaults write com.apple.Finder FXPreferredViewStyle -string "clmv"

 # Show the ~/Library folder.
chflags nohidden ~/Library

 # Disable the “Are you sure you want to open this application?” dialog
defaults write com.apple.LaunchServices LSQuarantine -bool false

 # Menu bar: disable transparency
defaults write NSGlobalDomain AppleEnableMenuBarTransparency -bool false

 # Expand save panel by default
defaults write NSGlobalDomain NSNavPanelExpandedStateForSaveMode -bool true

 # Expand print panel by default
defaults write NSGlobalDomain PMPrintingExpandedStateForPrint -bool true

 # Save to disk (not to iCloud) by default
defaults write NSGlobalDomain NSDocumentSaveNewDocumentsToCloud -bool false

 # Disable Resume system-wide
defaults write NSGlobalDomain NSQuitAlwaysKeepsWindows -bool false

 # Disable auto-correct
defaults write NSGlobalDomain NSAutomaticSpellingCorrectionEnabled -bool false

 # Allow quitting Finder via ⌘ + Q; doing so will also hide desktop icons
defaults write com.apple.finder QuitMenuItem -bool true

 # Show status bar in Finder
defaults write com.apple.finder ShowStatusBar -bool true

 # Enable full keyboard access for all controls
defaults write NSGlobalDomain AppleKeyboardUIMode -int 3

 # Save screenshots to the desktop
defaults write com.apple.screencapture location -string "$HOME/Desktop"

 # Disable shadow in screenshots
defaults write com.apple.screencapture disable-shadow -bool true

 # Finder: show hidden files by default
defaults write com.apple.Finder AppleShowAllFiles -bool true

 # Finder: show all filename extensions
defaults write NSGlobalDomain AppleShowAllExtensions -bool true

 # Finder: allow text selection in Quick Look
defaults write com.apple.finder QLEnableTextSelection -bool true

 # When performing a search, search the current folder by default
defaults write com.apple.finder FXDefaultSearchScope -string "SCcf"

 # Avoid creating .DS_Store files on network volumes
defaults write com.apple.desktopservices DSDontWriteNetworkStores -bool true

 # Disable the warning before emptying the Trash
defaults write com.apple.finder WarnOnEmptyTrash -bool false

 # Set the icon size of Dock items to 36 pixels
defaults write com.apple.dock tilesize -int 36

 # Trackpad: enable tap to click for this user and for the login screen
defaults write com.apple.driver.AppleBluetoothMultitouch.trackpad Clicking -bool true
defaults -currentHost write NSGlobalDomain com.apple.mouse.tapBehavior -int 1
defaults write NSGlobalDomain com.apple.mouse.tapBehavior -int 1

 # Disable dashboard
defaults write com.apple.dashboard mcx-disabled -boolean true

 # Number of recent items: 30 //TODO
 # Dock: Lock Dock Content //TODO
 # Dock: Lock icon size //TODO

 # Disable CapsLock // TODO
 # F keys without modifier // TODO
 # Tap to click // TODO
```

## 5. System utilities & Drivers
*Restart after installing all three to avoid multiple restarts*

* **Seil** <http://pqrs.org/> Remap CapsLock to F19 (Keycode 80)
* **Karabiner** <http://pqrs.org/> Remap Eject key to F13, disable menubar icon
* **NoEjectDelay** <http://pqrs.org/>
* Wacom Utility
* Sony Walkman NWZ-W273 Content Transfer [Manual download](http://esupport.sony.com/US/p/swu-download.pl?mdl=NWZW273&upd_id=9129&os_group_id=3)

## Resources

### Fonts

```
brew tap caskroom/fonts
brew cask install font-source-code-pro
```

## 6. General tools

#### Oh-my-zsh
``` bash
curl -L https://github.com/robbyrussell/oh-my-zsh/raw/master/tools/install.sh | sh
```

Replace custom folder with my synced from Dropbox:
```
rm -rf "$HOME/.oh-my-zsh/custom" && ln -s "$HOME/Dropbox/Sync/zsh-custom" "$HOME/.oh-my-zsh/custom"
```

Replace .zshrc with my synced from Dropbox:
```
rm -f "$HOME/.zshrc" && ln -s "$HOME/Dropbox/Sync/home/.zshrc" $HOME
```

#### Node
``` bash
brew install node
npm install -g bower grunt grunt-cli node-inspector
```

#### Heroku toolbelt
``` bash
brew cask install heroku-toolbelt
```

#### Other utils
brew install ctags wget
brew install
brew install imagemagick
brew install phantomjs


## Apps


#### 1Password
```
AppStore
```

```
Pref: Security: Disable Auto-Lock
Pref: Security: Enable automatic unlock
Pref: Browsers: Install Browsers Extensions (Safari, Chrome, Firefox)
Pref: Logins: Disable automatically submitting after filling
```


#### Alfred
```
brew cask install alfred
```

```
Activate Powerpack
Pref: Advanced: Syncing from ~/Dropbox/Alfred
Pref: Clipboard history persistent for 1 month
```

#### HyperSwitch
```
brew cask install hyperswitch
```

```
Pref: [x] Run HyperSwitch in the background
Pref: [x] Use shift to cycle backwards
```


#### Atom
```
brew cask install atom
```


#### The Unarchiver
```
AppStore
```

```
Pref: After successfully extracting an archive [x] Open the extracted folder [x] Move the archive to the trash
```


#### PopClip
```
download from AppStore
```

```
Pref: Disable Cut & Copy & Paste
```

Extensions
```
curl -O "http://pilotmoon.com/popclip/extensions/ext/{Say,Reminders,GoogleTranslate,Alfred,Dash}.popclipextz"
```




#### TotalFinder
```
Download manually
```

```
Pref: [x] Hide icon in Menu Bar
Pref: [x] Allow path copying from Context Menus
Pref: [x] Automatically adjust widths in Column View
Pref: Remove Keyboard Shortcuts
```


#### aText
```
Pref: Start at login
Pref: Do not show icon in Dock
Pref: Show aText in menu bar
Pref: Sync via iCloud
Key: ctrl + tab » search snippets
Key: ctrl + alt + tab » make snippet from selection
Key: ctrl + shift + tab » open main window
```


#### Dash
`Download from AppStore`

```
Pref: General: Launch Dash at login
Pref: General: Global search shortcut
Pref: General: Disable show dock icon
Pref: Downloads: Bootstrap, BackboneJS, CoffeeScript, CSS, Git, HTML, jQuery, Mac OS X, R, Ruby 2, Ruby on Rails 3, Ruby on Rails 4
Pref: Docsets
Pref: Integration: Alfred, PopClip, TextMate
```


#### Box
```
brew cask install box-sync
```

```


#### Flux
```
brew cask install flux
```

#### Firefox
```
brew cask install firefox
```


#### Cakebrew
```
brew cask install cakebrew
```

#### Caffeine
```
AppStore
```

#### Air Video HD
```
brew cask install air-video-server-hd
```

```
Pref: Start at Login : On
```

#### CheatSheet
```
AppStore
```


#### Cobook
```
AppStore
```

#### CodeRunner
```
AppStore
```

```
Pref: Javascript to Node
```

#### DayOne
```
AppStore
```

```
Pref: General: Remove Global Menu Bar Entry
Pref: Sync: iCloud
```

#### Evernote
`AppStore`

```
Pref: General: Keep Evernote Helper running
Pref: General: Show Elephant in Menubar
Pref: General: Start the Evernote Helper when I log in to my computer
Pref: Remove all keyboard shotcuts (colliding)
```


#### HandBrake
`brew cask install handbrake`


#### MonoSnap
`Download from AppStore`


#### Movist
`Download manually`


#### Numbers
`Download from AppStore`


#### Pages
`Download from AppStore`


#### pgAdmin3
`brew cask install pgadmin3`


#### Postgres
`download from http://postgresapp.com`


#### SourceTree
`AppStore`


#### Ulysses
`AppStore`


#### Google Chrome Canary
`brew cask install google-chrome-canary`

```
Enable Developer Tools experiments
Open DevTools, go to General tab and check Enable source maps
Open DevTools, go to Experiments tab and check Support for Sass
```

#### Webstorm
```
brew cask install webstorm
```

TODO: Sync settings


#### CodeRunner
`AppStore`


#### Github for Mac
Easy Git UI client for Mac, enables Clone in Dekstop button on Github.com
```
brew cask install GitHub
```

#### VirtualBox
`brew cask install virtualBox`  

https://github.com/xdissent/ievms


#### Microsoft Office


#### FontExplorer X Pro
```
download manually
```

#### iStatMenus
Overview of your computer stats in menubar.

#### Calibre
```
brew cask install calibre
```

#### Renamer
Convinient batch renamer
```
brew cask install renamer
```

#### Air Display
Extend computer screen to iOS device via Wifi.

```
airdisplay
```

#### Charles
```
brew cask install charles
```


#### GifBrewery
```
download manually
```


#### Keynote


#### Mathematica
```
download manually
```


#### MoneyWiz
```
download manually
```

#### Skype
```
brew cask install skype
```


#### Spotify
```
brew cask install spotify
```


#### Spotydl
```
download manually
```


#### Submerge
```
download manually
```

#### VLC
Good for codecs, Air Video HD can use them.

```
brew cask install vlc
```


#### SubsMarine
```
brew cask install subsmarine
```


#### Synthesia
```
download manually
```


#### Adobe After Effects CS6
// TODO: sync workspaces & presets via Dropbox


#### Adobe Audition CS6
// TODO: sync workspaces & presets via Dropbox


#### Adobe Bridge CS6
Pref: Labels: Disable Require the Command Key to Apply Labels and Ratings (*like Lightroom*)


#### Adobe Illustrator CS6
```
rm -rf "$HOME/Library/Preferences/Adobe Illustrator CS6 Settings/en_US/Workspaces"
ln -s "$HOME/Dropbox/Sync/Illustrator/Workspaces" "$HOME/Library/Preferences/Adobe Illustrator CS6 Settings/en_US/"
```
[VectorScribe](http://astutegraphics.com/download/vectorscribe-download.html)
[Inkscribe](http://astutegraphics.com/download/inkscribe-download.html)
[DynamicSketch](http://astutegraphics.com/download/dynamicsketch-download.html)
[Rasterino](http://astutegraphics.com/download/rasterino-download.html)
[ColliderScribe](http://astutegraphics.com/download/colliderscribe-download.html)

#### Adobe InDesign CS6
// TODO: sync workspaces & presets via Dropbox
```
Pref: General: Units & Increments: Milimeters
```

#### Adobe Photoshop CS6
##### Sync Presets & Workspaces from Dropbox
```
rm -rf "$HOME/Library/Preferences/Adobe Photoshop CS6 Settings/WorkSpaces"
ln -s "$HOME/Dropbox/Sync/Photoshop/WorkSpaces" !:2
rm -rf "$HOME/Library/Application Support/Adobe/Adobe Photoshop CS6/Presets"
ln -s "$HOME/Dropbox/Sync/Photoshop/Presets" !:2
```

##### Customize Preferences
`⌘ + k` to open Preferences
Turn off Animated zoom
Turn off Enable Flick Panning
Maximize PSD and PSB Files: Never

##### Plugins
* http://guideguide.me
* http://imagenomic.com/pt.aspx
* http://www.cutandslice.me
* http://lumens.se/tychpanel/
* Enigma64 http://getenigma64.com
* http://blog.kam88.com/en/expanding-smart-objects-script.html
* http://blog.kam88.com/en/lighten-darken-color-script.html
* http://blog.kam88.com/en/transform-each-beta-script.html


#### Adobe Photoshop Lightroom 5
```
Pref: General: Disable Show splash screen during startup
Pref: General: Disable Show import dialog when a memory card is detected
Pref: Presets: Disable Store presets with this catalog
Pref: External Editing: Edit in Adobe Photoshop – change Color Space to AdobeRGB // TODO: Study more
```

##### Presets
[Trey's Lightroom 5 Presets](http://store.stuckincustoms.com/lightroom-5-presets)
```
rm -rf "$HOME/Library/Application Support/Adobe/Lightroom"
ln -s "$HOME/Dropbox/Sync/apps/Lightroom Settings" "$HOME/Library/Application Support/Adobe/Lightroom"
```

#### Plug-ins
`⌥⌘⇧,` to open Plug-in Manager, add:
* [Dev Preset Lab](http://www.robcole.com/Rob/ProductsAndServices/DevPresetLabLrPlugin/)
* [The Fader](http://www.capturemonkey.com/thefader)
* [Preset Ripper](http://www.capturemonkey.com/presetripper)
* [Excessor](http://www.capturemonkey.com/excessor)
* [Focus Mask](http://www.capturemonkey.com/focusmask)

#### Adobe Premiere Pro CS6

#### RecordIt
```
http://recordit.co
```


#### Customize Dock
``` bash
defaults write com.apple.dock persistent-apps -array
for app in \
  "/Applications/Finder.app" \
  "/Applications/Calendar.app" \
  "/Applications/Safari.app" \
  "/Applications/Day One.app" \
  "/Applications/MoneyWiz.app" \
  "/Applications/Movist.app" \
  "/Applications/Mail.app" \
  "/Applications/Reminders.app" \
  "/Applications/Preview.app" \
  "/Applications/Things.app" \
  "/Applications/iTunes.app" \
  "/Applications/Ulysses.app" \
  "spacer" \
  "/Applications/FontExplorer X Pro.app" \
  "/Applications/Adobe Bridge CS6/Adobe Bridge CS6.app" \
  "/Applications/Adobe Photoshop Lightroom 5.app" \
  "/Applications/Adobe Photoshop CS6/Adobe Photoshop CS6.app" \
  "/Applications/Adobe Illustrator CS6/Adobe Illustrator.app" \
  "/Applications/Adobe Premiere Pro CS6/Adobe Premiere Pro CS6.app" \
  "/Applications/Adobe After Effects CS6/Adobe After Effects CS6.app" \
  "/Applications/Adobe Audition CS6/Adobe Audition CS6.app" \
  "/Applications/Adobe InDesign CS6/Adobe InDesign CS6.app" \
  "/Applications/MAXON/CINEMA 4D R14/CINEMA 4D.app" \
  "spacer" \
  "/opt/homebrew-cask/Caskroom/textmate/latest/TextMate.app" \
  "/opt/homebrew-cask/Caskroom/sourcetree/1.6.2.2/SourceTree.app" \
  "/Applications/Transmit.app" \
  "/Applications/Automator.app" \
  "/opt/homebrew-cask/Caskroom/iterm2/1.0.0/iTerm.app" \
  "spacer" \
  "/Applications/App Store.app" \
  "/Applications/System Preferences.app" \
  "spacer" \
  ; do
  if [ "$app" == "spacer" ]; then
    defaults write com.apple.dock persistent-apps -array-add '{tile-data={}; tile-type="spacer-tile";}'
  else
    defaults write com.apple.dock persistent-apps -array-add "<dict><key>tile-data</key><dict><key>file-data</key><dict><key>_CFURLString</key><string>$app</string><key>_CFURLStringType</key><integer>0</integer></dict></dict></dict>"
  fi
done

killall Dock
```

## Open With Defaults
TODO
