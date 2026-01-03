// components/Footer.tsx
"use client";

import {
  Box,
  Container,
  SimpleGrid,
  Stack,
  Text,
  Link,
  IconButton,
  Flex,
  HStack,
  GridItem,
  VStack,
} from "@chakra-ui/react";
import { FaLinkedin, FaTwitter, FaYoutube } from "react-icons/fa";
import { SiGoogledocs } from "react-icons/si";

const Footer = () => {
  return (
    <Box bg="#023E8A" color="gray.300" mt={12} w={'full'} display={'flex'} justifyContent={'center'}>
      <Container as={Stack} maxW="1380px" py={{ base: 6, md: 10 }}>
        {/* Top section */}
        <SimpleGrid
          columns={{ base: 1, sm: 2, md: 4 }}
          gap={{ base: 6, md: 8 }}
          alignItems="flex-start"
        >
          {/* Logo + Description */}


          {/* Product */}
          <Stack align="flex-start" ml={{ base: 0, md: 10 }} mt={{ base: 6, md: 2 }}>
            <Text fontWeight="bold" fontSize={'lg'} color="#F7F7EF" mb={2}>
              PRODUCT
            </Text>
            <Link href="/features" color="#D4D4D8" fontSize="md" fontWeight={'medium'}>Features</Link>
            {/* <Link href="/#HowItWorks" color="#D4D4D8" fontSize="md">Product</Link> */}
            <Link href="/pricing" color="#D4D4D8" fontSize="md">Pricing</Link>
            <Link href="/why" color="#D4D4D8" fontSize="md">Why</Link>
            <Link href="https://seoengine.featurebase.app/roadmap" target="_blank" color="#D4D4D8" fontSize="md">Roadmap</Link>
            <Link href="https://seoengine.featurebase.app/" target="_blank" color="#D4D4D8" fontSize="md">Feedback</Link>
            <Link href="https://status.seoengine.ai/" target="_blank" color="#D4D4D8" fontSize="md">Platform Status</Link>
            <Link href="https://docs.seoengine.ai/" target="_blank" color="#D4D4D8" fontSize="md">Changelogs</Link>
          </Stack>

          {/* Company */}
          <Stack align="flex-start" mt={{ base: 6, md: 2 }}>
            <Text fontWeight="bold" fontSize={'lg'} color="white" mb={2}>
              COMPANY
            </Text>
            <Link href="/our-story" color="#D4D4D8" fontSize="md">Our Story</Link>
            <Link href="/affiliate" color="#D4D4D8" fontSize="md">Affiliate Program</Link>
            <Link href="https://docs.seoengine.ai/privacy" color="#D4D4D8" fontSize="md" target="_blank">Privacy Policy</Link>
            <Link href="https://docs.seoengine.ai/terms" color="#D4D4D8" fontSize="md" target="_blank">Terms</Link>
            <Link href="https://docs.seoengine.ai/refund" color="#D4D4D8" fontSize="md" target="_blank">Refund</Link>
            <Link href="https://docs.seoengine.ai/cookie" color="#D4D4D8" fontSize="md" target="_blank">Cookies</Link>
            <Link href="https://docs.seoengine.ai/affiliate" color="#D4D4D8" fontSize="md" target="_blank">Affiliate Policy</Link>
            <Link href="https://newsletter.seoengine.ai/" color="#D4D4D8" fontSize="md" target="_blank">Newsletter</Link>
          </Stack>

          {/* Alternatives */}
          <Stack align="flex-start" mt={{ base: 6, md: 2 }}>
            <Text fontWeight="bold" fontSize={'lg'} color="white" mb={2}>
              ALTERNATIVES
            </Text>
            <Link href="/alternatives" color="#D4D4D8" fontSize="md">Alternative AI Writing Tools</Link>
            <Link href="/alternatives/vs-frase" color="#D4D4D8" fontSize="md">vs Frase.io</Link>
            <Link href="/alternatives/vs-neuronwriter" color="#D4D4D8" fontSize="md">vs NeuronWriter</Link>
            <Link href="/alternatives/vs-scalenut" color="#D4D4D8" fontSize="md">vs Scalenut</Link>
            <Link href="/alternatives/vs-seowriting" color="#D4D4D8" fontSize="md">vs SEOwriting.ai</Link>
            <Link href="/alternatives/vs-outrank" color="#D4D4D8" fontSize="md">vs outrank.so</Link>
            <Link href="/alternatives/vs-surferseo" color="#D4D4D8" fontSize="md">vs Surfer SEO</Link>
          </Stack>

          {/* Product */}
          <Stack align="flex-start" ml={{ base: 0, md: 10 }} mt={{ base: 6, md: 2 }}>
            <Text fontWeight="bold" fontSize={'lg'} color="#F7F7EF" mb={2}>
              Integrations
            </Text>
            <Link href="/integrations/webhook" color="#D4D4D8" fontSize="md">Webhook</Link>
            <Link href="/integrations/wordpress" color="#D4D4D8" fontSize="md">Wordpress</Link>
            <Link href="/integrations/shopify" color="#D4D4D8" fontSize="md">Shopify</Link>
            <Link href="/integrations/ghost" color="#D4D4D8" fontSize="md">Ghost</Link>
            <Link href="/integrations/webflow" color="#D4D4D8" fontSize="md">Webflow</Link>
            <Link href="/integrations/framer" color="#D4D4D8" fontSize="md">Framer</Link>
          </Stack>
        </SimpleGrid>



        {/* Divider */}
        <Box borderTopWidth={1} borderStyle="solid" borderColor="#F5F5F5" mt={10} pt={4} />

        <GridItem colSpan={{ base: 1, md: 2 }}>
          <Stack gap={4} maxW={{ base: "100%" }} alignItems={{ base: 'center', md: 'flex-start' }} flexDirection={{
            base: 'column',
            md: 'row'
          }}>
            <Box>
              <Flex
                direction={{ base: "column", md: "row" }}
                gap={{ base: 4, md: 6 }}
                align={{ base: "flex-start", md: "flex-start" }}
              >
                <img src={"/seologowhite.svg"} alt="SEOengineLogoFooter" width={230} height={200} />

              </Flex>
              <Text fontSize={{ base: "sm", md: "md" }}>
                Smart tools to analyze, optimize, and grow your online presence.
              </Text>
            </Box>
            <VStack
              align="flex-start"
              gap={{ base: 4, md: 6 }}
              flex={1}
              flexDirection={{ base: 'column', md: 'row' }}
            >
              <Box>
                <Text className="text-sm text-white !font-bold !mb-1">India Address:</Text>
                <Text fontSize="md">
                  TinyCheque Ventures Private Limited
                  <br />
                  Floor No.: 9 Floor, Tower-B3, Unit No-935, Spaze I Tech Park,
                  Sohna Road, Gurugram, Haryana, 122018
                </Text>
              </Box>
              <Box>
                <Text className="text-sm text-white !font-bold !mb-1">US Address:</Text>
                <Text fontSize="md">
                  TinyCheque, Inc.
                  <br />
                  131 Continental Dr, Suite 305, Newark, Delaware 19713
                </Text>
              </Box>
            </VStack>
          </Stack>
        </GridItem>
        {/* Bottom section */}

        <Box borderTopWidth={1} borderStyle="solid" borderColor="#F5F5F5" mt={10} pt={4} />

        <Flex
          direction={{ base: "column", md: "row" }}
          justify="space-between"
          align="center"
          mt={2}
        >
          <Text fontSize="md" mb={{ base: 2, md: 0 }} textAlign={{ base: "center", md: "left" }}>
            © {new Date().getFullYear()} SEOengine.ai by TinyCheque Ventures. All rights reserved.
          </Text>

          {/* Social Icons */}
          <HStack gap={4} justify={{ base: "center", md: "flex-end" }}>
            <IconButton
              aria-label="Twitter"
              variant="ghost"
              color="gray.400"
              _hover={{ color: "white" }}
              onClick={() => window.open("https://x.com/seoengineai", "_blank")}
            >
              <FaTwitter />
            </IconButton>
            <IconButton
              aria-label="Instagram"
              variant="ghost"
              color="gray.400"
              _hover={{ color: "white" }}
              onClick={() => window.open("https://www.instagram.com/seoengineai", "_blank")}
            >
              <SiGoogledocs />
            </IconButton>
            <IconButton
              aria-label="LinkedIn"
              variant="ghost"
              color="gray.400"
              _hover={{ color: "white" }}
              onClick={() => window.open("https://linkedin.com/company/seoengineai", "_blank")}
            >
              <FaLinkedin />
            </IconButton>
            <IconButton
              aria-label="YouTube"
              variant="ghost"
              color="gray.400"
              _hover={{ color: "white" }}
              onClick={() => window.open("https://www.youtube.com/@seoengineai", "_blank")}
            >
              <FaYoutube />
            </IconButton>
          </HStack>
        </Flex>
      </Container>
    </Box>
  );
};

export default Footer;
