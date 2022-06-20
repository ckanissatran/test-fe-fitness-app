//TODO: May change this later
//First example api call to test fetch.

import type { Session } from "../App";

export const getSessions = (): Promise<Session[]> => {
  return fetch("http://localhost:1337/graphql", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      query: `
        query {
          allSessions {
            id
            user_id
            name
            routine_id
            status
            start_time
            end_time
          }
        }
      `,
    }),
  })
    .then((res) => res.json())
    .then((result) => {
      return result.data.allSessions;
    });
};
