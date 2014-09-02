List of songs in CSV to iTunes playlist:

``` applescript
display dialog "Name of playlist?" default answer "Generated playlist"
set the_playlist_name to text returned of result

tell application "iTunes"
     set thePlaylist to make new user playlist with properties {name:the_playlist_name}
end tell

try
     set theFile to (choose file with prompt "Select a file tracks:")
     set csvData to read theFile
     set csvEntries to count paragraphs of csvData
     set AppleScript's text item delimiters to ","
     repeat with i from 1 to csvEntries
          set row to paragraph i of csvData
          set track_artist to text item 2 of row
          set track_name to text item 3 of row
          tell application "iTunes"
               set track_name_stripped to text 2 thru -2 of track_name -- remove quotes "…"
               set track_artist_stripped to text 2 thru -2 of track_artist
               if (exists (every file track whose name contains track_name_stripped and artist contains track_artist_stripped)) then
                    repeat with t in (file tracks whose name contains track_name_stripped and artist contains track_artist_stripped)
                         duplicate t to thePlaylist
                    end repeat
               else
                    display dialog "Not found: " & track_name_stripped
               end if
          end tell
     end repeat
on error number -39 --handle the end-of-file error
     close access theFile
     display dialog "All done"
end try
```