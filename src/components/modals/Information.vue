<template>
  <modal name="information" adaptive>
    <ul class="info-list">
      <li>
        <GithubIcon size="1x" />
        <a href="https://github.com/owntracks/frontend">
          owntracks/frontend
        </a>
        ({{ frontendVersion }})
      </li>
      <li>
        <GithubIcon size="1x" />
        <a href="https://github.com/owntracks/recorder">
          owntracks/recorder
        </a>
        ({{ recorderVersion || "Loading version..." }})
      </li>
      <li>
        <GlobeIcon size="1x" />
        <a href="https://owntracks.org">
          {{ $t("OwnTracks website") }}
        </a>
      </li>
      <li>
        <BookIcon size="1x" />
        <a href="https://owntracks.org/booklet/">
          {{ $t("OwnTracks documentation") }}
        </a>
      </li>
      <li>
        <TwitterIcon size="1x" />
        <a href="https://twitter.com/OwnTracks">
          {{ $t("OwnTracks on Twitter") }}
        </a>
      </li>
    </ul>
  </modal>
</template>

<script>
import { mapState } from "vuex";
import {
  BookIcon,
  GithubIcon,
  GlobeIcon,
  TwitterIcon,
} from "vue-feather-icons";

export default {
  components: { BookIcon, GithubIcon, GlobeIcon, TwitterIcon },
  computed: {
    ...mapState(["frontendVersion", "recorderVersion"]),
  },
};
</script>
