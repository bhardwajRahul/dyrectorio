//go:build integration

package cli_test

import (
	"os"
	"testing"
)

func TestMain(m *testing.M) {
	os.Exit(m.Run())
}

func TestBasic(t *testing.T) {
	// todo(nandor-magyar): write integration tests
}
