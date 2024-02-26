<template>
  <modal name="information" adaptive>
    <ul class="info-list">
      <li>
        <GithubIcon size="1x" aria-hidden="true" role="img" />
        <a href="https://github.com/owntracks/frontend">owntracks/frontend</a>
        ({{ frontendVersion }})
      </li>
      <li>
        <GithubIcon size="1x" aria-hidden="true" role="img" />
        <a href="https://github.com/owntracks/recorder">owntracks/recorder</a>
        ({{ recorderVersion || $t("Loading version...") }})
      </li>
      <li>
        <GlobeIcon size="1x" aria-hidden="true" role="img" />
        <a href="https://owntracks.org">
          {{ $t("OwnTracks website") }}
        </a>
      </li>
      <li>
        <BookIcon size="1x" aria-hidden="true" role="img" />
        <a href="https://owntracks.org/booklet/">
          {{ $t("OwnTracks documentation") }}
        </a>
      </li>
      <li>
        <AtSignIcon size="1x" aria-hidden="true" role="img" />
        <a href="https://fosstodon.org/@owntracks">
          {{ $t("OwnTracks on Mastodon") }}
        </a>
      </li>
    </ul>
  </modal>
</template>

<script>
import { mapState } from "vuex";
import { AtSignIcon, BookIcon, GithubIcon, GlobeIcon } from "vue-feather-icons";

export default {
  components: { AtSignIcon, BookIcon, GithubIcon, GlobeIcon },
  computed: {
    ...mapState(["frontendVersion", "recorderVersion"]),
  },
};
</script>
