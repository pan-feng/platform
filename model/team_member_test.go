// Copyright (c) 2015 Mattermost, Inc. All Rights Reserved.
// See License.txt for license information.

package model

import (
	"strings"
	"testing"
)

func TestTeamMemberJson(t *testing.T) {
	o := TeamMember{TeamId: NewId(), UserId: NewId()}
	json := o.ToJson()
	ro := TeamMemberFromJson(strings.NewReader(json))

	if o.TeamId != ro.TeamId {
		t.Fatal("Ids do not match")
	}
}

func TestTeamMemberIsValid(t *testing.T) {
	o := TeamMember{}

	if err := o.IsValid(); err == nil {
		t.Fatal("should be invalid")
	}

	o.TeamId = NewId()
	if err := o.IsValid(); err == nil {
		t.Fatal("should be invalid")
	}

	/*o.UserId = NewId()
	o.Roles = "blahblah"
	if err := o.IsValid(); err == nil {
		t.Fatal("should be invalid")
	}

	o.Roles = ""
	if err := o.IsValid(); err != nil {
		t.Fatal(err)
	}*/
}
