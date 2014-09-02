
Works best non-retina Macbook with OS X 10.7+.

``` applescript
set resolution1 to "1920 × 1200"
set resolution2 to "1280 × 800"

tell application "Finder" to set {a, b, c, d} to bounds of window of desktop
set currentResolution to (c as text) & " × " & d

if currentResolution is resolution1 then
     set newResolution to resolution2
else
     set newResolution to resolution1
end if

tell application "System Preferences"
     activate
     reveal pane id "com.apple.preference.displays"
     tell application "System Events"
          tell process "System Preferences"
               tell window 1
                    tell tab group 1
                         tell radio group 1
                              click radio button 2
                         end tell
                         tell table 1 of scroll area 1
                              select (row 1 whose value of text field 1 is newResolution)
                         end tell
                    end tell
               end tell
          end tell
     end tell
     quit
end tell
``` 